const path = require('path');
const express = require('express');
const socket = require('./src/Socket');
const ACTIONS = require('./src/Socket/actions');
const { Socket } = require('socket.io-client');
const { config } = require('process');

const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server);

const PORT = process.env.PORT || 3001;

function getClientRooms() {
    const rooms = io.sockets.adapter;

    return Array.from(rooms.keys());
};

function shareRoomsInfo() {
    io.emit(ACTIONS.SHARE_ROOMS, {
        rooms: getClientRooms()
    });
};

io.on('connection', socket => {
    shareRoomsInfo();

    socket.on(ACTIONS.JOIN, config => {
        const {room: roomID} = config;
        const {rooms, joinedRooms} = socket;

        if(Array.from(joinedRooms).includes(roomID)) {
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
        const {rooms} = socket;

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
        })
    }

    socket.on(ACTIONS.LEAVE, leaveRoom);
    socket.on('disconnecting', leaveRoom)

    console.log('Socket connected!');
});

server.listen(PORT, () => {
    console.log('Server started!')
});