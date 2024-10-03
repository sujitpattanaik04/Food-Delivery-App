const express = require("express");
const { registerUser, deleteUser } = require("./userController.js");

const router = express.Router();

router.route("/signup").post(registerUser);
router.route("/:userId").delete(deleteUser);

module.exports = router;
