const {
  loginUserService,
  forgotPasswordService,
  resetPasswordService,
  changePasswordService,
  sendOtpService,
  loginByOtpService,
} = require("./authService.js");
const asyncErrorHandler = require("../../utils/asyncErrorHandler.js");

const loginUser = asyncErrorHandler(async (req, res) => {
  const { user, token } = await loginUserService(req);

  const options = {
    maxAge: process.env.LOGIN_EXPIRES_IN,
    // httpOnly: true, // Prevent client-side access
    // secure: true, // Send cookie only over HTTPS
    // sameSite: "strict", // Adjust as needed for cross-site scenarios
  };

  res.cookie("authToken", token, options);

  res.status(200).json({
    status: "success",
    requestedAt: req.requestedAt,
    message: "You have logged in successfully",
    user,
  });
});

const forgotPassword = asyncErrorHandler(async (req, res) => {
  await forgotPasswordService(req);

  res.status(200).json({
    status: "success",
    requestedAt: req.requestedAt,
    message: "Password reset link was sent to the your email successfully",
  });
});

const resetPassword = asyncErrorHandler(async (req, res) => {
  await resetPasswordService(req);

  res.status(200).json({
    status: "success",
    requestedAt: req.requestedAt,
    message: "Password reset successfully",
  });
});

const changePassword = asyncErrorHandler(async (req, res) => {
  await changePasswordService(req);

  res.status(200).json({
    status: "success",
    requestedAt: req.requestedAt,
    message: "Password changed successfully",
  });
});

const logoutUser = asyncErrorHandler(async (req, res) => {
  res.clearCookie("authToken");
  res.status(200).json({
    status: "success",
    requestedAt: req.requestedAt,
    message: "Logout successfully",
  });
});

const sendOtp = asyncErrorHandler(async (req, res) => {
  await sendOtpService(req);

  res.status(200).json({
    status: "success",
    requestedAt: req.requestedAt,
    message: "OTP is successfully sent to your mobile number.",
  });
});

const loginByOtp = asyncErrorHandler(async (req, res) => {
  const { user, token } = await loginByOtpService(req);

  const options = {
    maxAge: process.env.LOGIN_EXPIRES_IN,
    // httpOnly: true, // Prevent client-side access
    // secure: true, // Send cookie only over HTTPS
    // sameSite: "strict", // Adjust as needed for cross-site scenarios
  };

  res.cookie("authToken", token, options);

  res.status(200).json({
    status: "success",
    requestedAt: req.requestedAt,
    message: "You have logged in successfully",
    user,
  });
});

module.exports = {
  loginUser,
  forgotPassword,
  resetPassword,
  changePassword,
  logoutUser,
  sendOtp,
  loginByOtp,
};
