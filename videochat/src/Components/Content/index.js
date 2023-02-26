import React, { useEffect, useRef, useState } from "react";
import './style.css';
import MedDocLogo from "./imgs/MedDoc.png";
import {socket} from "../../Socket";
import AOS from 'aos';
import 'aos/dist/aos.css';
import ACTIONS from "../../Socket/actions";
import { useNavigate } from "react-router-dom";
import {v4} from 'uuid';

AOS.init();

function Content () {
    const history = useNavigate();
    const [rooms, updateRooms] = useState([]);
    const rootNode = useRef();

    useEffect(() => {
        socket.on(ACTIONS.SHARE_ROOMS, ({rooms = []} = {}) => {
            if (rootNode.current) {
                updateRooms(rooms);
            }
        })
    }, [])

    return (
        <div ref={rootNode}>
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