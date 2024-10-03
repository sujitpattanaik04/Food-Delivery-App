const {
  loginUserService,
  forgotPasswordService,
  resetPasswordService,
  changePasswordService,
} = require("./authService.js");

const loginUser = async (req, res) => {
  try {
    const { user, token } = await loginUserService(req.body);

    const options = {
      maxAge: process.env.LOGIN_EXPIRES_IN,
      httpOnly: true,
    };

    res.cookie("authToken", token, options);

    res.status(200).json({
      status: "success",
      requestedAt: req.requestedAt,
      message: "You have logged in successfully!",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      requestedAt: req.requestedAt,
      message: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    await forgotPasswordService(req);

    res.status(200).json({
      status: "success",
      requestedAt: req.requestedAt,
      message: "Password reset link was sent to the user's email successfully",
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      requestedAt: req.requestedAt,
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const token = await resetPasswordService(req);

    const options = {
      maxAge: process.env.LOGIN_EXPIRES_IN,
      httpOnly: true,
    };

    res.cookie("authToken", token, options);

    res.status(200).json({
      status: "success",
      token,
      requestedAt: req.requestedAt,
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      requestedAt: req.requestedAt,
      message: error.message,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    await changePasswordService(req);

    res.status(200).json({
      status: "success",
      requestedAt: req.requestedAt,
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      requestedAt: req.requestedAt,
      message: error.message,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("authToken");
    res.status(200).json({
      status: "success",
      message: "Logout successful!",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Something went wrong!",
    });
  }
};

module.exports = {
  loginUser,
  forgotPassword,
  resetPassword,
  changePassword,
  logoutUser,
};
