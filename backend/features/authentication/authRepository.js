const { db } = require("../../models/connection.js");
const { Op } = require("sequelize");
const signToken = require("../../utils/signToken.js");
const sendEmail = require("../../utils/email.js");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const User = db.User;
const Role = db.Role;
const UserRole = db.UserRole;

const loginUser = async (userData) => {
  let { email, password, role } = userData;

  role = await Role.findOne({
    where: {
      roleName: {
        [Op.iLike]: role,
      },
    },
  });

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User with the given email couldn't found !!");
  }

  const isPasswordValid = await user.comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid Credentials !!");
  }

  const userRole = await UserRole.findOne({
    where: {
      user_uuid: user.uuid,
      role_uuid: role.uuid,
    },
  });

  if (!user) {
    throw new Error("You have entered incorrect role !!");
  }

  const token = signToken(user.uuid);
  console.log(100);

  return { user, token };
};

const forgotPassword = async (req) => {
  const { email } = req.body;

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) throw new Error("the given email is not found!");

  const resetToken = await user.createResetPasswordToken();

  await user.save();
  console.log(123);

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "sujit.pattanaik@argusoft.in",
      pass: "zepk rles rmrc iimd",
    },
  });

  const resetUrl = `http://localhost:8080/reset-password/${resetToken}`;

  let text = `<p>This is your passwod reset link:</p> <a>${resetUrl}</a>`;
  console.log(1234);

  await transporter.sendMail({
    to: user.email,
    subject: "Password Reset Link",
    html: text,
    link: `resetUrl`,
  });
  console.log(12345);

  const msg = `Hello ${user.email}, \nWe have received a password reset request. Please use below link to reset your password. Which is valid only for 10 minutes.\n${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password change request received.",
      message: msg,
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    user.save();

    throw new Error("Something went wrong in sending email!");
  }
};

const resetPassword = async (req) => {
  const { newPassword, confirmNewPassword } = req.body;

  const token = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    where: {
      passwordResetToken: token,
      passwordResetTokenExpires: { [Op.gt]: Date.now() },
    },
  });

  if (!user) {
    throw new Error("Token is invalid or has expired!");
  }

  if (newPassword !== confirmNewPassword)
    throw new Error("New Password & Confirm Password must be same!");

  user.password = newPassword;
  user.passwordResetToken = null;
  user.passwordResetTokenExpires = null;
  user.passwordChangedAt = Date.now();

  await user.save();

  return signToken(user.uuid);
};

const changePassword = async (req) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;
  const user = req.user;

  const isPasswordValid = await user.comparePassword(
    oldPassword,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error("Please provide valid old password!");
  }

  if (newPassword !== confirmNewPassword) {
    throw new Error("new password and confirm new password must be same!");
  }

  user.password = newPassword;
  user.passwordResetToken = null;
  user.passwordResetTokenExpires = null;
  user.passwordChangedAt = Date.now();

  await user.save();
};

module.exports = { loginUser, forgotPassword, resetPassword, changePassword };
