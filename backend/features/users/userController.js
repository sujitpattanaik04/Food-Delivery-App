const { registerUserService, deleteUserService } = require("./userService.js");
const asyncErrorHandler = require("../../utils/asyncErrorHandler.js");

const registerUser = asyncErrorHandler(async (req, res) => {
  const { user, token } = await registerUserService(req.body);

  delete user.dataValues.password;
  delete user.dataValues.deletedAt;
  delete user.dataValues.passwordChangedAt;
  delete user.dataValues.passwordResetToken;
  delete user.dataValues.passwordResetTokenExpires;

  const options = {
    maxAge: process.env.LOGIN_EXPIRES_IN,
    httpOnly: true, // Prevent client-side access
    // secure: true, // Send cookie only over HTTPS
    // sameSite: "strict", // Adjust as needed for cross-site scenarios
  };

  res.cookie("authToken", token, options);

  res.status(201).json({
    status: "success",
    requestedAt: req.requestedAt,
    message: "User created successfully!",
    user,
  });
});

const getUserDetails = asyncErrorHandler(async (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestedAt,
    user: req.user,
  });
});

const deleteUser = asyncErrorHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await deleteUserService(userId);

  res.status(200).json({
    status: "success",
    requestedAt: req.requestedAt,
    user,
  });
});

module.exports = { registerUser, deleteUser, getUserDetails };
