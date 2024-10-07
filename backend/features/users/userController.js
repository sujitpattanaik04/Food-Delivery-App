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
    httpOnly: true,
  };

  res.cookie("authToken", token, options);

  res.status(201).json({
    status: "success",
    requestedAt: req.requestedAt,
    message: "User created successfully!",
    user,
  });
});

const deleteUser = asyncErrorHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await deleteUserService(userId);

  res.status(200).json({
    status: "success",
    data: user,
  });
});

module.exports = { registerUser, deleteUser };
