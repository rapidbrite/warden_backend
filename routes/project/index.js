const express = require("express");
const route = express.Router();

const projectControllers = require("../../controller/project");
const requireAuth = require("../../middleware/auth/verify");



route.post("/get",projectControllers.getProject);
route.post("/all",requireAuth,projectControllers.getAllProject);
route.post("/create",requireAuth,projectControllers.createProject);
route.post("/delete",requireAuth,projectControllers.deleteProject);
route.post("/invite",projectControllers.inviteUserToProject);

module.exports = route;