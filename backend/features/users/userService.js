const {
  fetchUserByEmailOrPhone,
  fetchRole,
  createUser,
  createUserRole,
  fetchUserRole,
  deleteUser,
} = require("./userRepository.js");
const CustomError = require("../../utils/customError.js");

const registerUserService = async (userData) => {
  //GETTING ROLE FROM REQ BODY
  const { email, phone, role } = userData;

  //DELETING ROLE FROM NEW USER DATA BECAUSE WE NEED NOT TO ADD IT IN OUR USER TABLE
  delete newUser.role;

  //FINDING EXISTING ROLE FROM ROLE TABLE
  role = await fetchRole(role);

  //CHECK PASSWORD FORMAT
  try {
    validatePassword(newUser.password);
  } catch (error) {
    next(new CustomError(error.message, 400));
  }

  //CHECKING WHETHER USER ALREADY EXISTS OR NOT
  const user = await fetchUserByEmailOrPhone(email, phone);

  if (!user) {
    //ADD NEW USER TO OUR USER TABLE
    user = await createUser(userData);
  }

  //CHECK WHETHER ENTERED ROLE EXIST WITH USER OR NOT
  const userRole = await fetchUserRole(user, role);

  //IF EXISTS
  if (userRole)
    next(
      new CustomError("User with given email or phone is already exist !!", 400)
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
