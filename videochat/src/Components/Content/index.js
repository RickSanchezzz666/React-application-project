import React, { useEffect, useRef, useState } from "react";
import './style.css';
import {socket} from "../../Socket";
import ACTIONS from "../../Socket/actions";
import { useNavigate } from "react-router-dom";
import {v4} from 'uuid';
//import axios from 'axios';

function Content () {
    const history = useNavigate();
    const [rooms, updateRooms] = useState([]);
    const rootNode = useRef();

    {/* const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    const headers = {
        'Content-Type': 'application/json',
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post('http://localhost:3001/contact-form', {
            name,
            surname,
          });
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      };    */}

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

            {/* <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Ім'я:</label>
                    <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="surname">Surname:</label>
                    <input
                    type="text"
                    id="surname"
                    value={surname}
                    onChange={(event) => setSurname(event.target.value)}
                    />
                </div>
                <button type="submit">Відправити</button>
            </form> */}
        </div>
    )
}

export default Content;