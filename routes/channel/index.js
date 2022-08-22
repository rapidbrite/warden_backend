const express = require("express")
const route = express.Router();

const channelController = require("../../controller/channel");


route.post("/create" , channelController.createChannel);
// route.post("/get")
route.post("/getAll", channelController.getAllChannel);
route.post("/get", channelController.getChannel);
// route.post("/update")
// route.post("/delete")

module.exports = route;
