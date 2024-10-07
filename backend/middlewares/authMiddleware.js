const jwt = require("jsonwebtoken");
const { db } = require("../models/connection.js");

const User = db.User;

const protect = async (req, res, next) => {
  try {
    // 1. Read the token and check if it exists
    // const testToken = req.headers.authorization;

    //FOR POSTMAN
    // const token = req.headers.cookie?.split("=")[1];

    //FOR BROWSER
    const token = req.headers.cookies;

    // if (testToken && testToken.startsWith("Bearer ")) {
    //   token = testToken.split(" ")[1];
    // }

    if (!token) {
      throw new Error("You are not logged in!");
    }

    // 2. Validate the token
    const decodedToken = jwt.verify(token, process.env.SECRET_STR);

    const user = await User.findByPk(decodedToken.id);

    if (!user) {
      throw new Error("User with the given credential does not exist!");
    }

    // 4.Check if the vendor changed the password after the token was issued

    // if (await vendor.isPasswordChanged(decodedToken.iat)) {
    //   throw new CustomError(
    //     "Password has been changed recently. Please login again!")
    // }

    // 5. Attach user details to request object
    req.user = user;

    next();
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

module.exports = protect;
