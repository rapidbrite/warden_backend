const {
    setSocketServerInstance,
    getSocketServerInstance,
    addConnectedUsers
} = require('./store');

const registerSocketServer = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        }
    });
    setSocketServerInstance(io);

    io.on('connection', (socket) => {
        // console.log('a user connected', socket.id);
        socket.on('disconnect', () => {
            // console.log('user disconnected', socket.id);
        } );

        socket.on("addConnectedUser", (userName) => {
            addConnectedUsers(userName, socket.id);
        })
    }); 
};

module.exports = registerSocketServer;
