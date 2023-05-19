const io = require('socket.io-client')

const options = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"]
}

const socket = io('https://8196-194-44-221-10.ngrok-free.app/', options);

module.exports = {
    socket
}

/*http://localhost:3001 */