const jwt = require("jsonwebtoken");

const signToken = (uuid) => {
  return jwt.sign({ uuid }, process.env.SECRET_STR, {
    expiresIn: process.env.LOGIN_EXPIRES_IN,
  });
};

module.exports = signToken;
