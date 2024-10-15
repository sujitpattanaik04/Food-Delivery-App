const { registerUserService, deleteUserService } = require("./userService.js");
const asyncErrorHandler = require("../../utils/asyncErrorHandler.js");
const sendResponse = require("../../utils/sendResponse.js");
let msg;

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

  msg = "User created successfully!";

  sendResponse(200, req, res, msg, user);
});

const getUserDetails = asyncErrorHandler(async (req, res) => {
  sendResponse(200, req, res, _, req.user);
});

const deleteUser = asyncErrorHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await deleteUserService(userId);

  msg = "User created successfully!";

  sendResponse(200, req, res, _, user);
});

module.exports = { registerUser, deleteUser, getUserDetails };
