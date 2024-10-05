const {
  loginUserService,
  forgotPasswordService,
  resetPasswordService,
  changePasswordService,
} = require("./authService.js");
const asyncErrorHandler = require("../../utils/asyncErrorHandler.js");

const loginUser = asyncErrorHandler(async (req, res) => {
  const { user, token } = await loginUserService(req.body);

  const options = {
    maxAge: process.env.LOGIN_EXPIRES_IN,
  };

  res.cookie("authToken", token, options);

  res.status(200).json({
    status: "success",
    requestedAt: req.requestedAt,
    message: "You have logged in successfully!",
    data: { user, token },
  });
});

const forgotPassword = asyncErrorHandler(async (req, res, next) => {
  await forgotPasswordService(req);

  res.status(200).json({
    status: "success",
    requestedAt: req.requestedAt,
    message: "Password reset link was sent to the user's email successfully",
  });
});

const resetPassword = asyncErrorHandler(async (req, res, next) => {
  await resetPasswordService(req);

  res.status(200).json({
    status: "success",
    requestedAt: req.requestedAt,
    message: "Password reset successfully",
  });
});

const changePassword = asyncErrorHandler(async (req, res, next) => {
  await changePasswordService(req);

  res.status(200).json({
    status: "success",
    requestedAt: req.requestedAt,
    message: "Password changed successfully",
  });
});

const logoutUser = asyncErrorHandler(async (req, res, next) => {
  res.clearCookie("authToken");
  res.status(200).json({
    status: "success",
    message: "Logout successful!",
  });
});

module.exports = {
  loginUser,
  forgotPassword,
  resetPassword,
  changePassword,
  logoutUser,
};
