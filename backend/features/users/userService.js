const {
  fetchRole,
  fetchUserByEmailOrPhone,
  createUser,
  fetchUserRole,
  createUserRole,
  deleteUser,
} = require("./userRepository.js");
const CustomError = require("../../utils/customError.js");
const signToken = require("../../utils/signToken.js");
const decryptPassword = require("../../utils/decryptPassword.js");

const registerUserService = async (userData) => {
  //GETTING ROLE FROM REQ BODY
  let { email, phone, password, role } = userData;

  userData.password = decryptPassword(password);

  //FINDING EXISTING ROLE FROM ROLE TABLE
  role = await fetchRole(role);

  //CHECKING WHETHER USER ALREADY EXISTS OR NOT
  let user = await fetchUserByEmailOrPhone(email, phone);

  if (!user) {
    //ADD NEW USER TO OUR USER TABLE
    user = await createUser(userData);
  }

  //CHECK WHETHER ENTERED ROLE EXIST WITH USER OR NOT
  const userRole = await fetchUserRole(user, role);

  //IF EXISTS
  if (userRole)
    throw new CustomError(
      "User with given email or phone is already exist !!",
      400
    );

  //ADDING ENTRY TO OUR USER_ROLE THROUGH TABLE
  await createUserRole(user, role);

  const token = signToken(user.uuid);

  return { user, token };
};

const deleteUserService = async (userId) => {
  return await deleteUser(userId);
};

module.exports = {
  registerUserService,
  deleteUserService,
};
