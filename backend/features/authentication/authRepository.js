const { db } = require("../../models/connection.js");
const { Op } = require("sequelize");

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

const fetchUserByEmail = async (email) => {
  return await User.findOne({
    where: {
      email,
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

const fetchUserByResetToken = async (token) => {
  return await User.findOne({
    where: {
      passwordResetToken: token,
      passwordResetTokenExpires: { [Op.gt]: Date.now() },
    },
  });
};

module.exports = {
  fetchRole,
  fetchUserByEmail,
  fetchUserRole,
  fetchUserByResetToken,
};
