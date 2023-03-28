const io = require('socket.io-client')

const options = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"]
}

const socket = io('https://8bba-194-44-221-10.eu.ngrok.io/', options);

module.exports = {
    socket
}