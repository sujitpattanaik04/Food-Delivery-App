const CustomError = require("./customError.js");

const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*.?]/.test(password);

  const msg = `PASSWORD MUST CONTAIN :- \n*At least 8 Characters \n*Special Characters \n*Uppercase  \n*Lowercase    \n*Digits`;

  if (
    password.length < minLength ||
    !hasUpperCase ||
    !hasLowerCase ||
    !hasNumber ||
    !hasSpecialChar
  ) {
    throw new CustomError(msg, 400);
  } else {
    return true;
  }
};

module.exports = validatePassword;
