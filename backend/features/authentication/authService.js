const {
  fetchRole,
  fetchUserByEmail,
  fetchUserRole,
  fetchUserByResetToken,
  fetchUserByPhone,
} = require("./authRepository.js");
const signToken = require("../../utils/signToken.js");
const sendEmail = require("../../utils/sendEmail.js");
const CustomError = require("../../utils/customError.js");
const crypto = require("crypto");
const sendSMS = require("../../utils/sendSMS.js");
const { generateOtp, validateOtp } = require("../../utils/Otp.js");
const decryptPassword = require("../../utils/decryptPassword.js");

const loginUserService = async (req) => {
  let { email, password, role } = req.body;

  password = decryptPassword(password);

  //FINDING EXISTING ROLE FROM ROLE TABLE
  role = await fetchRole(role);

  const user = await fetchUserByEmail(email);

  if (!user)
    throw new CustomError("User with the given email couldn't found !!", 404);

  const isPasswordValid = await user.comparePassword(password, user.password);

  if (!isPasswordValid)
    throw new CustomError("You have entered wrong password !!", 401);

  const userRole = await fetchUserRole(user, role);

  if (!userRole)
    throw new CustomError("You have entered incorrect role !!", 401);

  const token = signToken(user.uuid);

  return { user, token };
};

const loginByOtpService = async (req) => {
  let { phone, role, otp } = req.body;

  role = await fetchRole(role);

  const user = await fetchUserByPhone(phone);

  if (!user)
    throw new CustomError(
      "User with the given phone number couldn't found !!",
      404
    );

  const userRole = await fetchUserRole(user, role);

  if (!userRole)
    throw new CustomError("You have entered incorrect role !!", 401);

  const result = validateOtp(otp, user.otp, user.otpExpiryTime);

  if (!result.isValid) throw new CustomError(result.message, 401);

  user.otp = null;
  user.otpExpiryTime = null;

  user.save();

  const token = signToken(user.uuid);

  return { user, token };
};

const forgotPasswordService = async (req) => {
  const { email } = req.body;

  console.log(email);

  const user = await fetchUserByEmail(email);

  if (!user) throw new CustomError("User the given email is not found !!", 404);

  const resetToken = await user.createResetPasswordToken();

  await user.save();

  const resetUrl = `http://192.1.200.113:8080/reset-password/${resetToken}`;

  const html = `<pre>Hello ${user.email},\n      We have received a password reset request. Please use given link to reset your password. Which is valid only for 10 minutes. <a href=${resetUrl}>Password Reset Link</a> </pre>  `;

  try {
    sendEmail({
      to: user.email,
      subject: "Password Reset Request Received",
      link: `${resetUrl}`,
      html,
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    user.save();

    throw new CustomError("Something went wrong in sending mail !!", 400);
  }

  return;
};

const resetPasswordService = async (req) => {
  let { newPassword } = req.body;

  newPassword = decryptPassword(newPassword);

  const token = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  console.log(22, req.params);

  const user = await fetchUserByResetToken(token);

  if (!user) throw new CustomError("Token is invalid or has expired !!", 401);

  user.password = newPassword;
  user.passwordResetToken = null;
  user.passwordResetTokenExpires = null;
  user.passwordChangedAt = Date.now();

  await user.save();

  return;
};

const changePasswordService = async (req) => {
  let { oldPassword, newPassword } = req.body;
  const user = req.user;

  newPassword = decryptPassword(newPassword);

  const isPasswordValid = await user.comparePassword(
    oldPassword,
    user.password
  );

  if (!isPasswordValid)
    throw new CustomError("Please provide valid Old Password !!", 401);

  user.password = newPassword;
  user.passwordResetToken = null;
  user.passwordResetTokenExpires = null;
  user.passwordChangedAt = Date.now();

  await user.save();
};

const sendOtpService = async (req) => {
  let { phone, role } = req.body;

  role = await fetchRole(role);

  const user = await fetchUserByPhone(phone);

  if (!user)
    throw new CustomError(
      "User with the given phone number couldn't found !!",
      404
    );

  const userRole = await fetchUserRole(user, role);

  if (!userRole)
    throw new CustomError("You have entered incorrect role !!", 401);

  const { otp, expiryTime } = generateOtp();

  const body = `Dear ${user.fullname}, Your one time password (OTP) for verifying your account is: ${otp}. Please enter this code within the next 10 minutes to complete your verification.
         If you did not request this OTP, please ignore this message.`;

  try {
    user.otp = otp;
    user.otpExpiryTime = expiryTime;

    sendSMS(body);
  } catch (error) {
    throw new CustomError("Something went wrong in sending OTP !!", 400);
  }
  user.save();

  return;
};

module.exports = {
  loginUserService,
  forgotPasswordService,
  resetPasswordService,
  changePasswordService,
  sendOtpService,
  loginByOtpService,
};
