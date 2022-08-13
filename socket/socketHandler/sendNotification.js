const serverStore = require("../store");

const sendNotification = (notification,userName) => {
    const io = serverStore.getSocketServerInstance();
    const connectedUsers = serverStore.getConnectedUsers();
    const socketAddress = connectedUsers.get(userName);
    if (socketAddress) {
        io.to(socketAddress).emit("notification", notification);
    }
}

module.exports = sendNotification;