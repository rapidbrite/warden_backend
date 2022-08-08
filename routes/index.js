const express = require("express")
const route = express.Router();
const logout = require("../controller/logout");


route.use("/auth",require("./auth"))
route.get("/logout",logout.logout);
route.use("/project",require("./project"))



module.exports = route;