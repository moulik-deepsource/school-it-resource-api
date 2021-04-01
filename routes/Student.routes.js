const { Router } = require("express");

const StudentsController = require("../controllers/StudentsController");

// ~~> Mounted as /students
const route = Router();

route.post("/", StudentsController.addStudent);

module.exports = route;
