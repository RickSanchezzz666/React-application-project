const io = require('socket.io-client')

const options = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"]
}

const socket = io('https://8c7e-92-253-212-16.eu.ngrok.io/', options);

module.exports = {
    socket
} 