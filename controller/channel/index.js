const createChannel = require('./create');
const getAllChannel = require('./getAll');
const getChannel = require('./get');
const controller = {
    createChannel,
    getAllChannel,
    getChannel
}

module.exports = controller;