const { Router } = require("express");

const StudentsController = require("../controllers/Students.controller");

// ~~> Mounted as /students
const route = Router();

route.get("/", StudentsController.getAllStudents);
route.get("/:id", StudentsController.getStudentById);
route.post("/", StudentsController.addStudent);

module.exports = route;
