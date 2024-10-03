const { registerUser, deleteUser } = require("./userRepository.js");

const registerUserService = async (newUser) => {
  const res = await registerUser(newUser);
  return res;
};

const deleteUserService = async (userId) => {
  const res = await deleteUser(userId);
  return res;
};

module.exports = {
  registerUserService,
  deleteUserService,
};
