const route = require('express').Router();
const userController = require('../../controller/user');
const response = require("../../utils/response");


route.post('/getDataByJWT', userController.getUserData);
route.post('/acceptInvite', userController.acceptInvite);


module.exports = route;