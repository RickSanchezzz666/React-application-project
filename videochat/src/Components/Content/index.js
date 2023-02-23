import React, { useEffect, useState } from "react";
import './style.css';
import {socket} from "../../Socket";
import ACTIONS from "../../Socket/actions";
import { useNavigate } from "react-router-dom";
import {v4} from 'uuid';

function Content () {
    const history = useNavigate();
    const [rooms, updateRooms] = useState([]);

    useEffect(() => {
        socket.on(ACTIONS.SHARE_ROOMS, ({rooms = []} = {}) => {
            updateRooms(rooms);
        })
    }, [])

    return (
        <div>
            <h1>Available Rooms</h1>
            <ul>
                {rooms.map(roomID => (
                    <li key={roomID}>
                        {roomID}
                        <button onClick={() => {
                            history(`/room/${roomID}`)
                        }}>Join Room</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => {
                history(`/room/${v4()}`)
            }}>Create new room</button>
        </div>
    )
}

export default Content;