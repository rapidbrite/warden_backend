const express = require("express");
const route = express.Router();

const projectControllers = require("../../controller/project");
const requireAuth = require("../../middleware/auth/verify");

route.post("/get")
route.post("/all")
route.post("/create")
route.post("/delete")
route.post("/invite")

module.exports = route;