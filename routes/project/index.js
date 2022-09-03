const express = require("express");
const route = express.Router();

const projectControllers = require("../../controller/project");
const requireAuth = require("../../middleware/auth/verify");



route.post("/get",projectControllers.getProject);
route.post("/all",requireAuth,projectControllers.getAllProject);
route.post("/create",requireAuth,projectControllers.createProject);
route.post("/delete",requireAuth,projectControllers.deleteProject);
route.post("/invite",projectControllers.inviteUserToProject);
route.post("/update",requireAuth,projectControllers.updateProject);
route.post("/makeadmin",requireAuth,projectControllers.addAdminToProject);
route.post("/removeadmin",requireAuth,projectControllers.removeAdminFromProject);
route.post("/removeuser",requireAuth,projectControllers.removeUser);


module.exports = route;