// This files will be used for gathering all new routes-controllers correlations in one place
const express = require("express");

const router = express.Router();

// const PermissionGuard = require("../guards/PermissionGuard");

// ** All needed routes
const StudentRoute = require("../routes/Student.route");
const SpecialRoute = require("../routes/Special.route");
const SubjectRoute = require("../routes/Subject.route");
const HomeworkRoute = require("../routes/Homework.route");

// ! Route setup
router.use("/auth", SpecialRoute);
router.use("/subjects", SubjectRoute);
router.use("/students", StudentRoute);
router.use("/homeworks", HomeworkRoute);

module.exports = router;
