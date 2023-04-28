const io = require('socket.io-client')

const options = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"]
}

const socket = io('https://react-application-project.vercel.app/', options);

module.exports = {
    socket
}

/*http://localhost:3001 */