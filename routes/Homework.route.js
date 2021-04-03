const { Router } = require("express");
const {
  getAllHomeworks,
  getHomeworkById,
  addHomework,
  removeHomework,
  updateHomework,
} = require("../controllers/Homework.controller");

// ~~> Mounted as /homeworks
const route = Router();

route.get("/", getAllHomeworks);
route.post("/", addHomework);
route.get("/:id", getHomeworkById);
route.delete("/:id", removeHomework);
route.put("/:id", updateHomework);

module.exports = route;
