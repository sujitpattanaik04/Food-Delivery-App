const {
  fetchRole,
  fetchUserByEmailOrPhone,
  createUser,
  fetchUserRole,
  createUserRole,
  deleteUser,
} = require("./userRepository.js");
const CustomError = require("../../utils/customError.js");
const validatePassword = require("../../utils/passwordValidator.js");
const signToken = require("../../utils/signToken.js");
const forge = require("node-forge");
const fs = require("fs");

// Load keys from files
// const privateKeyPem = fs.readFileSync("../backend/private_key.pem", "utf8");

const registerUserService = async (userData) => {
  //GETTING ROLE FROM REQ BODY
  let { email, phone, password, role } = userData;

  //DELETING ROLE FROM NEW USER DATA BECAUSE WE NEED NOT TO ADD IT IN OUR USER TABLE
  delete userData.role;

  // Decode base64 to binary
  const encryptedBytes = forge.util.decode64(password);

  // Decrypt the data using private key
  const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

  userData.password = privateKey.decrypt(encryptedBytes, "RSA-OAEP");

  //FINDING EXISTING ROLE FROM ROLE TABLE
  role = await fetchRole(role);

  //CHECK PASSWORD FORMAT
  try {
    validatePassword(userData.password);
  } catch (error) {
    throw new CustomError(error.message, 400);
  }

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
