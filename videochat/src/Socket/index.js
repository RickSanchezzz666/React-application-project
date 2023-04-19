const io = require('socket.io-client')

const options = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"]
}

const socket = io('https://7981-92-253-212-16.ngrok-free.app/', options);

module.exports = {
    socket
}

/*http://localhost:3001 */