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

Modal.setAppElement(document.getElementById('doctor-component-wrapper'));

const AdminsAccount = ({ name, surname, profilePic }) => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [doctorRoomCreate, setDoctorRoomCreate] = useContext(MyContext);

  const [searchName, setSearchName] = useState();
  const [searchSurname, setSearchSurname] = useState();
  const [searchAccessLevel, setSearchAccessLevel] = useState();
  const [searchCountry, setSearchCountry] = useState();
  const [searchCity, setSearchCity] = useState();
  const [searchBloodType, setSearchBloodType] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Arvo']
      }
    });
    document.title = "Dashboard | MedDoc";
    handleGetUsers();
  }, []);

  const roomsRef = useRef();

  function closeModal() {
    setIsOpen(false);
  }

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

  async function openRoomsModal() {
    setIsOpen(true)
  }

  const getUsers = async (token) => {
    try {
      const res = await axios.get("/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          name: searchName,
          surname: searchSurname,
          access_level: searchAccessLevel,
          country: searchCountry,
          city: searchCity,
          blood_type: searchBloodType,
        }
      });
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
    <div id='doctor-component-wrapper' className='doctor-component-wrapper'>
      <Modal
        className={"admin-account-modal-window-wrapper"}
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Create a new user"
      >
        <h2>Create a new user</h2>
        
      </Modal>
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
            <button onClick={() => { navigate('/') }}>W/no logout</button>
          </div>
        </div>
        <div className='doctor-account-component-grid-2'>
          <div className="doctor-account-component-grid-2-section">
            <div className='admin-account-component-grid-1'>
              <div className="admin-account-component-grid-2-create-user">
                <button id='create-new-user-button' className='admin-account-component-grid-2-create-user-button'>Create a new user</button>
              </div>
              <div className="admin-account-component-grid-2-available-rooms">
                <button id='show-available-rooms' className='admin-account-component-grid-2-available-rooms-button' ref={roomsRef} onClick={openRoomsModal}>Show available rooms</button>
              </div>
              <div className="admin-account-component-grid-2-start-meeting">
                <button className='admin-account-component-grid-2-start-meeting-button' onClick={startMeeting}>Start meeting</button>
              </div>
            </div>

            <Modal
              className={"admin-rooms-modal-window-wrapper"}
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Room ID and Password"
            >
              <h2>Available rooms</h2>
              <div className="admin-rooms-modal-window-info">Room ID: <span className="admin-rooms-modal-window-info-text">{id}</span>
                Pass: <span className="admin-rooms-modal-window-info-text">{password}</span><button className='admin-rooms-modal-window-button'>Join</button></div>
              <button className="room-modal-window-button" onClick={closeModal}>Close</button>
            </Modal>

            <div className="doctor-account-component-client-base">Client Base</div>

            <div className="doctor-account-component-client-base-area">
              <input value={searchName} onChange={(event) => setSearchName(event.target.value)} style={{ width: '70px', marginRight: '10px' }} placeholder='Name'></input>
              <input value={searchSurname} onChange={(event) => setSearchSurname(event.target.value)} style={{ width: '70px', marginRight: '10px' }} placeholder='Surname'></input>
              <select value={searchAccessLevel} onChange={(event) => setSearchAccessLevel(event.target.value)} style={{ width: '70px', marginRight: '10px' }} name="Role">
                <option value="20">User</option>
                <option value="25">Doctor</option>
                <option value="30">Admin</option>
              </select>
              <input value={searchCountry} onChange={(event) => setSearchCountry(event.target.value)} style={{ width: '70px', marginRight: '10px' }} placeholder='Country'></input>
              <input value={searchCity} onChange={(event) => setSearchCity(event.target.value)} style={{ width: '70px', marginRight: '10px' }} placeholder='City'></input>
              <input value={searchBloodType} onChange={(event) => setSearchBloodType(event.target.value)} style={{ width: '70px', marginRight: '10px' }} placeholder='Blood type'></input>
              <button id='doctor-get-user' onClick={handleGetUsers}>Search</button><br />
              <div className="doctor-account-component-client-base-table">
                <table class="doctor-account-component-client-base-list">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Surname</th>
                      <th className='table_user_acess_level'>User role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td>{user.user_info.name}</td>
                        <td>{user.user_info.surname}</td>
                        <td>{user.user_info.access_level === 20 ? 'User' 
                              : user.user_info.access_level === 25 ? 'Doctor'
                              : user.user_info.access_level === 30 ? 'Admin'
                              : user.user_info.access_level}</td>
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

export default AdminsAccount;