const express = require("express");
const route = express.Router();

const chatController = require("../../controller/chat");

route.post("/send", chatController.sendMessage);
route.post("/get", chatController.getMessages);
// route.post("/delete");
// route.post("/edit");



module.exports = route;