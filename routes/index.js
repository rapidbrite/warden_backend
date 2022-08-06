const express = require("express");
const route = express.Router();
const logoutController = require("../controller/logout");


route.get("/logout",logoutController.logout);

module.exports = route;