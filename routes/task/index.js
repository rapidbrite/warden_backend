const route = require('express').Router();
const taskController = require("../../controller/board/task");

route.post("/create", taskController.createTask);
route.post("/getAll", taskController.getAllTasks);
module.exports = route;