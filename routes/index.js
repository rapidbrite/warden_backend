const express = require("express");
const route = express.Router();

const logoutController = require("../controller/logout");


route.use("/auth",require("./auth"))
route.get("/logout",logoutController.logout);
route.use("/project",require("./project"))



module.exports = route;