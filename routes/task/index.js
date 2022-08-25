const route = require('express').Router();
const taskController = require("../../controller/board/task");

route.post("/create", taskController.createTask);
route.post("/getAll", taskController.getAllTasks);
route.post("/delete", taskController.deleteTask);
route.post("/reorder", taskController.reorderTask);
route.post("/move", taskController.changeStatus);

module.exports = route;