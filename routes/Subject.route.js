const { Router } = require("express");

const {
  getAllSubjects,
  addSubject,
  removeSubject,
  updateSubject,
} = require("../controllers/Subject.controller");

// ~~> Mounted as /subjects
const route = Router();

route.get("/", getAllSubjects);
route.post("/", addSubject);
route.delete("/:id", removeSubject);
route.put("/:id", updateSubject);

module.exports = route;
