const getProject = require("./get");
const getAllProject = require("./all")
const createProject = require("./create");
const deleteProject = require("./delete");
const inviteUserToProject = require("./invite");

const controller = {
    getProject,
    getAllProject,
    createProject,
    deleteProject,
    inviteUserToProject
}

module.exports = controller;

// okay