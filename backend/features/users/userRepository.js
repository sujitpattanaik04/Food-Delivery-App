const { Op } = require("sequelize");
const { db } = require("../../models/connection.js");
const validatePassword = require("../../utils/passwordValidator.js");
const signToken = require("../../utils/signToken.js");

const User = db.User;
const Role = db.Role;
const UserRole = db.UserRole;

const fetchUserByEmailOrPhone = async (email, phone) => {
  return await User.findOne({
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
};

const fetchRole = async (role) => {
  return await Role.findOne({
    where: {
      roleName: {
        [Op.iLike]: role,
      },
    },
  });
};

const fetchUserRole = async (user, role) => {
  return await UserRole.findOne({
    where: {
      user_uuid: user.uuid,
      role_uuid: role.uuid,
    },
  });
};
const createUser = async (userData) => {
  return await User.create(userData);
};

const createUserRole = async (user, role) => {
  return await UserRole.create({
    user_uuid: user.uuid,
    role_uuid: role.uuid,
  });
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
  return await User.destroy({
    where: { uuid: userId },
  });
};

module.exports = {
  fetchUserByEmailOrPhone,
  fetchRole,
  createUser,
  createUserRole,
  fetchUserRole,
  deleteUser,
};
