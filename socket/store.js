let connectedUsers = new Map();
let io = null;

const setSocketServerInstance = (ioInstance) => {
    io = ioInstance;
}

const getSocketServerInstance = () => { 
    return io;
}

const addConnectedUsers = (userName,socketId) => {
    connectedUsers.set(userName, socketId);
    console.log(connectedUsers);
}

const getConnectedUsers = () => { 
    return connectedUsers;
}


module.exports = {
    setSocketServerInstance,
    getSocketServerInstance,
    addConnectedUsers,
    getConnectedUsers
}