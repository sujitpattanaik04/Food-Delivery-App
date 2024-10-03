const { Op } = require("sequelize");
const { db } = require("../../models/connection.js");
const validatePassword = require("../../utils/passwordValidator.js");

const User = db.User;
const Role = db.Role;
const UserRole = db.UserRole;

const registerUser = async (newUser) => {
  //GETTING ROLE FROM REQ BODY
  const { email, phone, role } = newUser;

  //DELETING ROLE FROM NEW USER DATA BECAUSE WE NEED NOT TO ADD IT IN OUR USER TABLE
  delete newUser.role;

  //FINDING EXISTING ROLE FROM ROLE TABLE
  const enteredRole = await Role.findOne({
    where: { roleName: role },
  });

  //CHECK PASSWORD FORMAT
  try {
    validatePassword(newUser.password);
  } catch (error) {
    throw new Error(error.message);
  }

  //CHECKING WHETHER USER ALREADY EXISTS OR NOT
  let user = await User.findOne({
    where: {
      [Op.or]: {
        email,
        phone,
      },
    },
    attributes: {
      exclude: [
        "password",
        "deletedAt",
        "passwordResetToken",
        "passwordResetTokenExpires",
        "passwordChangedAt",
      ],
    },
  });

  if (!user) {
    //ADD NEW USER TO OUR USER TABLE
    user = await User.create(newUser);
  }

  //CHECK WHETHER ENTERED ROLE EXIST WITH USER OR NOT
  let existedUserRole = await UserRole.findOne({
    where: {
      user_uuid: user.uuid,
      role_uuid: enteredRole.uuid,
    },
  });

  //IF EXISTS
  if (existedUserRole) {
    throw new Error("User with given email or phone is already exist!");
  }

  //ADDING ENTRY TO OUR USER_ROLE THROUGH TABLE
  await UserRole.create({
    user_uuid: user.uuid,
    role_uuid: enteredRole.uuid,
  });

  return user;
};

// const deleteUser = async (userId) => {
//   const user = await User.findOne({
//     where: {
//       uuid: userId,
//     },
//   });
//   user.isDeleted = true;
//   await user.save();
//   return;
// };

const deleteUser = async (userId) => {
  await User.destroy({
    where: { uuid: userId },
  });
  return;
};

module.exports = { registerUser, deleteUser };
