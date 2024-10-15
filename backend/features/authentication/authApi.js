const {
  loginUser,
  forgotPassword,
  resetPassword,
  changePassword,
  logoutUser,
  sendOtp,
  loginByOtp,
  getPublicKeyPem,
} = require("./authController.js");
const authMiddleware = require("../../middlewares/authMiddleware.js");
const express = require("express");

const router = express.Router();

router.route("/login").post(loginUser);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);
router.route("/change-password").post(authMiddleware, changePassword);
router.route("/logout").get(logoutUser);
router.route("/send-OTP").post(sendOtp);
router.route("/login-by-OTP").post(loginByOtp);
router.route("/get-public-key-pem").get(getPublicKeyPem);

module.exports = router;
