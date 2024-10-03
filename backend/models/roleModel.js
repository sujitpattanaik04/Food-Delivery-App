const { DataTypes } = require("sequelize");

// Define the User model using ES6 syntax
module.exports = (connectDB) => {
  const Role = connectDB.define(
    "Role",
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      roleName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      modelName: "Role",
      tableName: "roles",
      timestamps: true,
      paranoid: true,
    }
  );
  return Role;
};
