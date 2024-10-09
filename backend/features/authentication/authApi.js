const {
  loginUser,
  forgotPassword,
  resetPassword,
  changePassword,
  logoutUser,
} = require("./authController.js");
const authMiddleware = require("../../middlewares/authMiddleware.js");
const express = require("express");

const router = express.Router();

router.route("/login").post(loginUser);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);
router.route("/change-password").post(authMiddleware, changePassword);
router.route("/logout").post(authMiddleware, logoutUser);

module.exports = router;
