// This files will be used for gathering all new routes-controllers correlations in one place
const express = require("express");

const router = express.Router();

// ** All needed controllers
const UserController = require("../controllers/UserController");
const AuthServerController = require("../controllers/AuthServerController.js");

// ! Route setup
router.use("/auth", AuthServerController);
router.use("/users", UserController);

module.exports = router;
