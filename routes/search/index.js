const route = require('express').Router();
const searchController = require("../../controller/search");

route.post("/user", searchController.searchUser);

module.exports = route;