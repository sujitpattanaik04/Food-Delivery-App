const {
  fetchRole,
  fetchUserByEmail,
  fetchUserByResetToken,
  fetchUserRole,
} = require("./authRepository.js");
const signToken = require("../../utils/signToken.js");
const sendEmail = require("../../utils/gmail.js");
const CustomError = require("../../utils/customError.js");
const crypto = require("crypto");

const loginUserService = async (userData) => {
  let { email, password, role } = userData;

  role = await fetchRole(role);

  const user = await fetchUserByEmail(email);

  if (!user)
    next(new CustomError("User with the given email couldn't found !!", 404));

  const isPasswordValid = await user.comparePassword(password, user.password);

  if (!isPasswordValid)
    next(new CustomError("You have entered wrong password !!", 400));

  const userRole = await fetchUserRole(user, role);

  if (!userRole)
    next(new CustomError("You have entered incorrect role !!", 400));

  const token = signToken(user.uuid);

  return { user, token };
};

const forgotPasswordService = async (req) => {
  const { email } = req.body;

  const user = await fetchUserByEmail(email);

  if (!user) next(new CustomError("User the given email is not found!", 404));

  const resetToken = await user.createResetPasswordToken();

  await user.save();

  const resetUrl = `http://localhost:8080/reset-password/${resetToken}`;

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

    if (!user)
      next(new CustomError("Something went wrong in sending mail !!", 404));
  }

  return;
};

const resetPasswordService = async (req) => {
  const { newPassword } = req.body;

  const token = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await fetchUserByResetToken(token);

  if (!user) next(new CustomError("Token is invalid or has expired!", 400));

  user.password = newPassword;
  user.passwordResetToken = null;
  user.passwordResetTokenExpires = null;
  user.passwordChangedAt = Date.now();

  await user.save();

  return;
};

const changePasswordService = async (req) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const user = req.user;

  const isPasswordValid = await user.comparePassword(
    oldPassword,
    user.password
  );

  if (!isPasswordValid)
    next(new CustomError("Please provide valid old password!", 400));

  if (newPassword !== confirmPassword)
    next(
      new CustomError(
        "new password and confirm new password must be same!",
        400
      )
    );

  user.password = newPassword;
  user.passwordResetToken = null;
  user.passwordResetTokenExpires = null;
  user.passwordChangedAt = Date.now();

  await user.save();
};

module.exports = {
  loginUserService,
  forgotPasswordService,
  resetPasswordService,
  changePasswordService,
};
