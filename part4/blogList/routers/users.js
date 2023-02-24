const express = require("express");

const router = express.Router();

const { getAllUsers, addNewUser } = require("../controllers/usersController");

//* Route handlers
router.route("/").get(getAllUsers).post(addNewUser);

module.exports = router;
