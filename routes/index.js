const express = require("express")
const route = express.Router();
const logout = require("../controller/logout");


route.use("/auth",require("./auth"))
route.get("/logout",logout.logout);
route.use("/project", require("./project"))
route.use("/user", require("./user"))
route.use('/search',require("./search"))
route.use("/notification", require("./notification"))
route.use("/chat",require("./chat"))
route.use("/channel",require("./channel"))
route.use("/task",require("./task"))



module.exports = route;