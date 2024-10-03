const { registerUser, deleteUser } = require("./userRepository.js");

const registerUserService = async (newUser) => {
  return await registerUser(newUser);
};

const deleteUserService = async (userId) => {
  const res = await deleteUser(userId);
  return res;
};

module.exports = {
  registerUserService,
  deleteUserService,
};
