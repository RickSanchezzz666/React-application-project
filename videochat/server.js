const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');                              // Парсер тіла POST API запитів
const Mongo = require('./src/setup/mongoose');
const authMiddleware = require('./src/middlewares/auth.middleware');    // Middleware
const socket = require('./src/Socket');
const ACTIONS = require('./src/Socket/actions');
const { Socket } = require('socket.io-client');
const { config } = require('process');
const cors = require('cors');
const { version, validate } = require('uuid')
require('dotenv').config();                                            // Загальні серверні налаштування

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT_BACK;

const RouterAPI = require('./src/api');
const exp = require('constants');

app.use(bodyParser.json());
app.use(cors())

console.log('MONGO_DB_URI:', process.env.MONGO_DB_URI);

function getClientRooms() {
    const { rooms } = io.sockets.adapter;

    return Array.from(rooms.keys()).filter(roomID => validate(roomID) && version(roomID) === 4);
};

function shareRoomsInfo() {
    io.emit(ACTIONS.SHARE_ROOMS, {
        rooms: getClientRooms()
    });
};

const setup = async () => {
    await Mongo.setupDb(process.env.MONGO_DB_URI);

    authMiddleware(app);

    app.use(RouterAPI.router);

    app.use(express.static('build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "./build/index.html"))
    })

    io.on('connection', socket => {
        shareRoomsInfo();
    
        socket.on(ACTIONS.JOIN, config => {
            const { room: roomID } = config;
            const { rooms: joinedRooms } = socket;
    
            if (Array.from(joinedRooms).includes(roomID)) {
                return console.warn(`Already joined to ${roomID}`);
            }
    
            const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || [])
    
            clients.forEach(clientID => {
                io.to(clientID).emit(ACTIONS.ADD_PEER, {
                    peerID: socket.id,
                    createOffer: false
                })
    
                socket.emit(ACTIONS.ADD_PEER, {
                    peerID: clientID,
                    createOffer: true
                })
            })
    
            socket.join(roomID);
            shareRoomsInfo();
        })
    
        function leaveRoom() {
            const { rooms } = socket;
    
            Array.from(rooms).forEach(roomID => {
                const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || [])
    
                clients.forEach(clientID => {
                    io.to(clientID).emit(ACTIONS.REMOVE_PEER, {
                        peerID: socket.id
                    })
    
                    socket.emit(ACTIONS.REMOVE_PEER, {
                        peerID: clientID,
                    })
                })
                socket.leave(roomID);
            })
            shareRoomsInfo();
        }
    
        socket.on(ACTIONS.LEAVE, leaveRoom);
        socket.on('disconnecting', leaveRoom)
    
        socket.on(ACTIONS.RELAY_SDP, ({ peerID, sessionDescription }) => {
            io.to(peerID).emit(ACTIONS.SESSION_DESCRIPTION, {
                peerID: socket.id,
                sessionDescription,
            })
        })
    
        socket.on(ACTIONS.RELAY_ICE, ({ peerID, iceCandidate }) => {
            io.to(peerID).emit(ACTIONS.ICE_CANDIDATE, {
                peerID: socket.id,
                iceCandidate,
            })
        })
    
        console.log('Socket connected!');
    });
    
    server.listen(PORT, () => {
        console.log(`Server started on ${PORT}`)
    })

};

module.exports = setup();
