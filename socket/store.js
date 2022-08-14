const userModel = require("../model/userSchema");

let connectedUsers = new Map();
let connectedUsersInSingleProject = new Map();
let io = null;

const setSocketServerInstance = (ioInstance) => {
    io = ioInstance;
}

const getSocketServerInstance = () => { 
    return io;
}

const addConnectedUsers = (userName,socketId) => {
    connectedUsers.set(userName, socketId);
    // console.log(connectedUsers);
}

const getConnectedUsers = () => { 
    return connectedUsers;
}

const addConnectedUsersInSingleProject = async (userName, projectId, socketId) => {
    if(connectedUsersInSingleProject.get(projectId) === undefined){
        connectedUsersInSingleProject.set(projectId, {});
    }
    const projectsUser = connectedUsersInSingleProject.get(projectId); // {}
    if(projectsUser[userName] === undefined){
        projectsUser[userName] = socketId;
    }
    // console.log(connectedUsersInSingleProject);
}

const getConnectedUsersInSingleProject = () => {
    return connectedUsersInSingleProject;
}


module.exports = {
    setSocketServerInstance,
    getSocketServerInstance,
    addConnectedUsers,
    getConnectedUsers,
    addConnectedUsersInSingleProject,
    getConnectedUsersInSingleProject
}