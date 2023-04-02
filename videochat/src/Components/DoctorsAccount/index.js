import './style.css';
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {socket} from "../../Socket";
import Header from '../Header/Header'
import {v4} from 'uuid';
import ACTIONS from "../../Socket/actions";
import axios from "axios";
import WebFont from 'webfontloader';

let name = "Slavik";
let surname = "Petrenko";
let docIcon  = "https://i.ibb.co/HFbBrvn/Icon-profile.png";

const getUsers = async (token) => {
  try {
    const res = await axios.get("/api/clients", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
    alert("Something went wrong, see console");
    return [];
  }
};

const DoctorsAccount = () => {
  const [users, setUsers] = useState([]);
  const [rooms, updateRooms] = useState([]);
  const navigate = useNavigate();
  const rootNode = useRef();

  useEffect(() => {
    socket.on(ACTIONS.SHARE_ROOMS, ({rooms = []} = {}) => {
        if (rootNode.current) {
            updateRooms(rooms);
        }
    })
}, [])

  useEffect(() => {
      WebFont.load({
        google: {
          families: ['Arvo']
        }
      });
     }, []);

  const handleGetUsers = () => {
    const token = localStorage.getItem("token");
    getUsers(token).then((data) => setUsers(data));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/doctor/login");
  };

  return (
    <div className='doctor-component-wrapper'>
      <Header />
      <div className="backgroundHelloDoctor">
        <div className='grid-1'>
          <div className='grid-avatar'>
            <div className="porfileSpace">
              <img className="iconProfile" src={docIcon}></img>
            </div>
          </div>
          <div className='grid-text'>
            <span className="profileText">{name}</span>
            <span className="profileText text-11">{surname}</span>
          </div>
        </div>
        <div className='grid-2'>
          <div className="sectionDoctor">
          <div className="startMeetingDoctor">
          <button className='startMeetingButtonDoctor' onClick={() => {
                navigate(`/room/${v4()}`)
            }}>Start meeting</button>
          </div>
          <div className="clientBase">Client Base</div>

          <div className="clientBazeArea">
            <span className="textClientBase">Name</span>
            <span className="textClientBase">Last name</span>
            <div className="textAreaClientBaze"></div>
          </div>
        
      </div>
    </div>
        </div>
    </div>


    /*<div>
        <div ref={rootNode}>
            <h1>Available Rooms</h1>
            <ul>
                {rooms.map(roomID => (
                    <li key={roomID}>
                        {roomID}
                        <button onClick={() => {
                            navigate(`/room/${roomID}`)
                        }}>Join Room</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => {
                navigate(`/room/${v4()}`)
            }}>Create new room</button><br/><br/><br/>
        </div>

      <span className='alerter'>! Check validity of your token !</span><br/><br/>
      <button id='getusers' onClick={handleGetUsers}>Get Users</button><br/>
      <button onClick={handleLogout}>Logout</button>
      <table class="clientsList">
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>City</th>
            <th>Country</th>
            <th>Zipcode</th>
            <th>Birthday</th>
            <th>Overall</th>
            <th>Blood Type</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.contact_information.name}</td>
              <td>{user.contact_information.surname}</td>
              <td>{user.contact_information.email}</td>
              <td>{user.contact_information.phone}</td>
              <td>{user.location.address}</td>
              <td>{user.location.city}</td>
              <td>{user.location.country}</td>
              <td>{user.location.zipcode}</td>
              <td>{user.patient_info.birthday}</td>
              <td>{user.patient_info.overall}</td>
              <td>{user.patient_info.blood_type}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
            <tr>
                <td colspan="10">
                    <div class="links">
                        <span style={{ color: "black", marginRight: "20px" }}>Buttons temporary INOP!</span>
                        <a href="#">&laquo;</a>
                        <a class="active" href="#">1</a>
                        <a href="#">2</a>
                        <a href="#">3</a>
                        <a href="#">4</a>
                        <a href="#">&raquo;</a>
                    </div>
                </td>
            </tr>
        </tfoot>
      </table>
    </div>*/
  );
};

export default DoctorsAccount;