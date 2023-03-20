import './style.css';
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {socket} from "../../Socket";
import {v4} from 'uuid';
import ACTIONS from "../../Socket/actions";
import axios from "axios";

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

const DoctorsCabinet = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [rooms, updateRooms] = useState([]);
  const rootNode = useRef();

  useEffect(() => {
    socket.on(ACTIONS.SHARE_ROOMS, ({rooms = []} = {}) => {
        if (rootNode.current) {
            updateRooms(rooms);
        }
    })
}, [])

  const handleGetUsers = () => {
    const token = localStorage.getItem("token");
    getUsers(token).then((data) => setUsers(data));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/doctor/login");
  };

  return (
    <div>
      <div className="phoneCall">
          <img src="/images/call.png" alt="" className="call" />
          <div className="cyrcleAboutUs1"></div>
          <div className="cyrcleAboutUs2"></div>
        </div>
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
    </div>
  );
};

export default DoctorsCabinet;