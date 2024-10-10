const {
  registerUser,
  getUserDetails,
  deleteUser,
} = require("./userController.js");
const authMiddleware = require("../../middlewares/authMiddleware.js");
const express = require("express");

const router = express.Router();

router.route("/signup").post(registerUser);
router.route("/:userId").delete(deleteUser);
router.route("/get-user").get(authMiddleware, getUserDetails);

module.exports = router;
