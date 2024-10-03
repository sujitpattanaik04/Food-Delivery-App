const { DataTypes } = require("sequelize");
const User = require("./userModel.js");
const Role = require("./roleModel.js");

module.exports = (connectDB) => {
  const UserRole = connectDB.define(
    "UserRole",
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      user_uuid: {
        type: DataTypes.UUID,
        references: {
          model: User,
          key: "uuid",
        },
      },
      role_uuid: {
        type: DataTypes.UUID,
        references: {
          model: Role,
          key: "uuid",
        },
      },
    },
    {
      modelName: "UserRole",
      tableName: "user_roles",
      timestamps: true,
      paranoid: true,
    }
  );
  return UserRole;
};
