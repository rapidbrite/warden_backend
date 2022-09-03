const getProject = require("./get");
const getAllProject = require("./all")
const createProject = require("./create");
const deleteProject = require("./delete");
const inviteUserToProject = require("./invite");
const updateProject = require("./update");
const addAdminToProject = require("./makeadmin");
const removeAdminFromProject = require("./removeadmin");
const removeUser = require("./removeuser");


const controller = {
    getProject,
    getAllProject,
    createProject,
    deleteProject,
    inviteUserToProject,
    updateProject,
    addAdminToProject,
    removeAdminFromProject,
    removeUser
    
}

module.exports = controller;

