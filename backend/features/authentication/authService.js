const {
  loginUser,
  forgotPassword,
  resetPassword,
  changePassword,
} = require("./authRepository.js");

const loginUserService = async (userData) => {
  return await loginUser(userData);
};

const forgotPasswordService = async (req) => {
  return await forgotPassword(req);
};

const resetPasswordService = async (req) => {
  return await resetPassword(req);
};

const changePasswordService = async (req) => {
  return await changePassword(req);
};

module.exports = {
  loginUserService,
  forgotPasswordService,
  resetPasswordService,
  changePasswordService,
};
