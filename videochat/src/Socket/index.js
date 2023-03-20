const io = require('socket.io-client')

const options = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"]
}

const socket = io('https://ded8-194-44-221-10.eu.ngrok.io/', options);

module.exports = {
    socket
}