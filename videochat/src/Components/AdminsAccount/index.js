import './style.css';
import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../Socket";
import Header from '../Header/Header'
import ACTIONS from "../../Socket/actions";
import axios from "axios";
import WebFont from 'webfontloader';
import Modal from 'react-modal';
import { MyContext } from '../GlobalContex';
export { id, password };

let id = '';
let password = '';

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

const DoctorsAccount = ({ name, surname, profilePic }) => {
  const [users, setUsers] = useState([]);
  const [rooms, updateRooms] = useState([]);
  const [doctorRoomCreate, setDoctorRoomCreate] = useContext(MyContext);
  const rootNode = useRef();
  const navigate = useNavigate();

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
      document.title = "Dashboard | MedDoc";
     }, []);

  function roomIdGenerator(length) {
      let result = '';
      const characters = 'ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
      }
      return result;
  }

  function passwordGenerator(length) {
    let result = '';
    const characters = 'ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  async function startMeeting() {
    id = roomIdGenerator(6);
    password = passwordGenerator(5);
    const token = localStorage.getItem("token");
    setDoctorRoomCreate(true);
    try {
      const res = await axios.post("/api/create-new-room", {
        roomId: id,
        password: password,
        startTime: Date.now(),
        createdBy: `${name} ${surname}`
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(`/room/${id}`);
      return res.data;
    } catch (error) {
      console.error(error);
      alert("Something went wrong, see console");
      return [];
    }
  };

  const handleGetUsers = () => {
    const token = localStorage.getItem("token");
    getUsers(token).then((data) => setUsers(data));
  };

  const setLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className='doctor-component-wrapper'>
      <Header />
        <div className="doctor-account-component-wrapper">
          <div className='doctor-account-component-grid-1'>
            <div className='doctor-account-component-grid-1-avatar'>
              <div className="doctor-account-component-grid-1-space">
                <img className="doctor-account-component-grid-1-icon" src={profilePic}></img>
              </div>
            </div>
            <div className='doctor-account-component-grid-text'>
              <span className="doctor-account-component-grid-profile-text">{name}</span>
              <span className="doctor-account-component-grid-profile-text doctor-account-component-grid-profile-text-2">{surname}</span>
              <span className="doctor-account-component-grid-profile-text" style={{ color: "red", marginTop: "20px" }}>Admin</span>
              <button onClick={setLogout}>Logout</button>
              <button onClick={() => {navigate('/')}}>W/no logout</button>
            </div>
          </div>
          <div className='doctor-account-component-grid-2'>
            <div className="doctor-account-component-grid-2-section">
            <div className="doctor-account-component-grid-2-start-meeting">
              <button className='doctor-account-component-grid-2-start-meeting-button' onClick={startMeeting}>Start meeting</button>
            </div>
            <div className="doctor-account-component-grid-2-create-user">
              <button id='create-new-user-button' className='doctor-account-component-grid-2-start-meeting-button' >Create a new user</button>
            </div>
            
            <div className="doctor-account-component-client-base">Client Base</div>

            <div className="doctor-account-component-client-base-area">
                  <button id='doctor-get-user' onClick={handleGetUsers}>Get Users</button><br/>
                <div className="doctor-account-component-client-base-table">
                  <table class="doctor-account-component-client-base-list">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Surname</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user._id}>
                          <td>{user.user_info.name}</td>
                          <td>{user.user_info.surname}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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