const serverStore = require("../store");

const sendMessage = (data, userName, projectId) => {
    const io = serverStore.getSocketServerInstance();
    const connectedUsersInProject = serverStore.getConnectedUsersInSingleProject();
    const socketAddresses = connectedUsersInProject.get(projectId);
    for (const key of Object.keys(socketAddresses)) {
        if(key !== userName) {
            io.to(socketAddresses[key]).emit("sendMessage", data);
        }
    }
}

module.exports = sendMessage;