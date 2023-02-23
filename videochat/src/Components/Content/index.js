import React, { useEffect, useState } from "react";
import './style.css';
import MedDocLogo from "./imgs/MedDoc.png";
import {socket} from "../../Socket";
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();
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
            main page
        </div>
    )
}

export default Content;