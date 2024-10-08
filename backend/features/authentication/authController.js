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
    httpOnly: true, // Prevent client-side access
    secure: true, // Send cookie only over HTTPS
    // sameSite: "strict", // Adjust as needed for cross-site scenarios
  };

  res.cookie("authToken", token, options);

  res.status(200).json({
    status: "success",
    requestedAt: req.requestedAt,
    message: "You have logged in successfully",
    data: { user, token },
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
  // res.clearCookie("authToken", { path: "/" });
  // res.status(200).json({
  //   status: "success",
  //   requestedAt: req.requestedAt,
  //   message: "Logout successfully",
  // });

  res.clearCookie("authToken", {
    httpOnly: true, // Should match the settings used when setting the cookie
    secure: true, // Should match the settings used when setting the cookie
    // sameSite: "strict", // Should match the settings used when setting the cookie
    path: "/", // Specify the path if it was set when creating the cookie
  });

  // res.clearCookie("authToken");
  res.status(200).json({
    status: "success",
    requestedAt: req.requestedAt,
    message: "Logout successfully",
  });
});

module.exports = {
  loginUser,
  forgotPassword,
  resetPassword,
  changePassword,
  logoutUser,
};
