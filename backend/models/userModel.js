const { DataTypes } = require("sequelize");
const validatePassword = require("../utils/passwordValidator.js");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

// Define the User model using ES6 syntax
module.exports = (connectDB) => {
  const User = connectDB.define(
    "User",
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Username cannot be empty!",
          },
        },
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          isEmail: {
            msg: "Please enter a valid email address!",
          },
          notEmpty: {
            msg: "Email cannot be empty!",
          },
        },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password cannot be empty!",
          },
        },
      },
      phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Phone Number cannot be empty!",
          },
        },
      },
      passwordResetToken: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      passwordResetTokenExpires: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      passwordChangedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      modelName: "User",
      tableName: "users",
      timestamps: true,
      paranoid: true,
      hooks: {
        beforeValidate: async (user) => {
          console.log(user.password);
          validatePassword(user.password);
          console.log(78);
        },
        beforeCreate: async (user) => {
          user.password = await bcrypt.hash(user.password, 10);
        },
        beforeUpdate: async (user) => {
          user.password = await bcrypt.hash(user.password, 10);
        },
      },
    }
  );

  User.prototype.comparePassword = async function (password, passwordInDB) {
    return await bcrypt.compare(password, passwordInDB);
  };

  User.prototype.createResetPasswordToken = async function () {
    const resetToken = crypto.randomBytes(16).toString("hex");

    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
  };

  return User;
};
