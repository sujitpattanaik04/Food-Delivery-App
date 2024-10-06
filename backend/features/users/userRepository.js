const { Op } = require("sequelize");
const { db } = require("../../models/connection.js");

const User = db.User;
const Role = db.Role;
const UserRole = db.UserRole;

const fetchRole = async (role) => {
  return await Role.findOne({
    where: {
      roleName: {
        [Op.iLike]: role,
      },
    },
  });
};

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

const createUser = async (userData) => {
  return await User.create(userData);
};

const fetchUserRole = async (user, role) => {
  return await UserRole.findOne({
    where: {
      user_uuid: user.uuid,
      role_uuid: role.uuid,
    },
  });
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
  fetchRole,
  fetchUserByEmailOrPhone,
  createUser,
  createUserRole,
  fetchUserRole,
  deleteUser,
};
