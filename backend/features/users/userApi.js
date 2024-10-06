const { registerUser, deleteUser } = require("./userController.js");
const express = require("express");

const router = express.Router();

router.route("/signup").post(registerUser);
router.route("/:userId").delete(deleteUser);

module.exports = router;
