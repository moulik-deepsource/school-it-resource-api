// This files will be used for gathering all new routes-controllers correlations in one place
const express = require("express");

const router = express.Router();

// const PermissionGuard = require("../guards/PermissionGuard");

// ** All needed routes
const StudentRoute = require("../routes/Student.route");
const AuthServerController = require("../controllers/AuthServerController.js");

// ! Route setup
router.use("/auth", AuthServerController);

router.use("/students", StudentRoute);

module.exports = router;
