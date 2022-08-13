const express = require("express")
const route = express.Router();

const notificationController = require("../../controller/notification")

route.post("/getAll", notificationController.getNotification);

module.exports = route;