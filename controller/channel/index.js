const createChannel = require('./create');
const getAllChannel = require('./getAll');
const getChannel = require('./get');
const updateChannel = require('./update');
const deleteChannel = require('./delete');
const controller = {
    createChannel,
    getAllChannel,
    getChannel,
    updateChannel,
    deleteChannel
}

module.exports = controller;