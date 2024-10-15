const {
  loginUserService,
  forgotPasswordService,
  resetPasswordService,
  changePasswordService,
  sendOtpService,
  loginByOtpService,
} = require("./authService.js");
const asyncErrorHandler = require("../../utils/asyncErrorHandler.js");
const fs = require("fs");
const sendResponse = require("../../utils/sendResponse.js");
let msg;

const getPublicKeyPem = asyncErrorHandler(async (req, res) => {
  const publicKeyPem = fs.readFileSync("../backend/public_key.pem", "utf8");

  msg = "PublicKeyPem Sent Successfully";

  sendResponse(200, req, res, msg, publicKeyPem);
});

const loginUser = asyncErrorHandler(async (req, res) => {
  const { user, token } = await loginUserService(req);

  const options = {
    maxAge: process.env.LOGIN_EXPIRES_IN,
    httpOnly: true, // Prevent client-side access
    // secure: true, // Send cookie only over HTTPS
    // sameSite: "strict", // Adjust as needed for cross-site scenarios
  };

  res.cookie("authToken", token, options);

  msg = "You have logged in successfully";

  sendResponse(200, req, res, msg, user);
});

const forgotPassword = asyncErrorHandler(async (req, res) => {
  await forgotPasswordService(req);

  msg = "Password reset link was sent to the your email successfully";

  sendResponse(200, req, res, msg);
});

const resetPassword = asyncErrorHandler(async (req, res) => {
  await resetPasswordService(req);

  msg = "Password reset successfully";

  sendResponse(200, req, res, msg);
});

const changePassword = asyncErrorHandler(async (req, res) => {
  await changePasswordService(req);

  msg = "Password changed successfully";

  sendResponse(200, req, res, msg);
});

const logoutUser = asyncErrorHandler(async (req, res) => {
  res.clearCookie("authToken");

  msg = "Logout successfully";

  sendResponse(200, req, res, msg);
});

const sendOtp = asyncErrorHandler(async (req, res) => {
  await sendOtpService(req);

  msg = "OTP is successfully sent to your mobile number.";

  sendResponse(200, req, res, msg);
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

  msg = "You have logged in successfully";

  sendResponse(200, req, res, msg, user);
});

module.exports = {
  loginUser,
  forgotPassword,
  resetPassword,
  changePassword,
  logoutUser,
  sendOtp,
  loginByOtp,
  getPublicKeyPem,
};
