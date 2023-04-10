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
export { adminId, adminPassword }

let adminId = '';
let adminPassword = '';

Modal.setAppElement(document.getElementById('doctor-component-wrapper'));

const AdminsAccount = ({ name, surname, profilePic }) => {
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [modalRoomIsOpen, setModalRoomIsOpen] = useState(false);
  const [modalNewUserIsOpen, setModalNewUserIsOpen] = useState(false);
  const [doctorRoomCreate, setDoctorRoomCreate] = useContext(MyContext);
  const [adminRoomCreate, setAdminRoomCreate] = useContext(MyContext);

  const [searchName, setSearchName] = useState();
  const [searchSurname, setSearchSurname] = useState();
  const [searchAccessLevel, setSearchAccessLevel] = useState();
  const [searchCountry, setSearchCountry] = useState();
  const [searchCity, setSearchCity] = useState();
  const [searchBloodType, setSearchBloodType] = useState();

  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newName, setNewName] = useState("");
  const [newSurname, setNewSurname] = useState("");
  const [newLogin, setNewLogin] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newProfilePic, setNewProfilePic] = useState("https://i.ibb.co/HFbBrvn/Icon-profile.png");
  const [newCreatedBy, setNewCreatedBy] = useState(`${name} ${surname}`);
  const [newCreationTime, setNewCreationTime] = useState(new Date());
  const [newAccessLevel, setNewAccessLevel] = useState("20");
  const [newBirthday, setNewBirthday] = useState("");
  const [newGender, setNewGender] = useState("Male");
  const [newAddress, setNewAddress] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [newZipcode, setNewZipcode] = useState("");
  const [newOverall, setNewOverall] = useState("");
  const [newBloodType, setNewBloodType] = useState("1");

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
    setModalRoomIsOpen(false);
    setModalNewUserIsOpen(false);
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
    adminId = roomIdGenerator(6);
    adminPassword = passwordGenerator(5);
    const token = localStorage.getItem("token");
    setDoctorRoomCreate(true);
    setAdminRoomCreate(false)
    try {
      const res = await axios.post("/api/create-new-room", {
        roomId: adminId,
        password: adminPassword,
        startTime: Date.now(),
        createdBy: `${name} ${surname}`
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(`/room/${adminId}`);
      return res.data;
    } catch (error) {
      console.error(error);
      alert("Something went wrong, see console");
      return [];
    }
  };

  async function openRoomsModal() {
    setModalRoomIsOpen(true)
  }

  async function openNewUserModal() {
    setModalNewUserIsOpen(true)
  }

  const ModalNewUser = {
    overlay: {
      overflowY: 'auto',
    },
  };

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

  const getRooms = async (token) => {
    try {
      const res = await axios.get("/api/show-available-rooms", {
        headers: {
          Authorization: `Bearer ${token}`,
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

  const handleGetRooms = () => {
    const token = localStorage.getItem("token");
    getRooms(token).then((data) => setRooms(data));
  };

  async function createUser() {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post("/api/create-new-user", {
        user_info: {
          email: newEmail,
          phone: newPhone,
          name: newName,
          surname: newSurname,
          login: newLogin,
          password: newPassword,
          profile_pic: newProfilePic,
          createdBy: newCreatedBy,
          creationTime: newCreationTime,
          access_level: newAccessLevel,
          birthday: newBirthday,
          gender: newGender
        },
        location_info: {
          address: newAddress,
          city: newCity,
          country: newCountry,
          zipcode: newZipcode
        },
        patient_info: {
          overall: newOverall,
          blood_type: newBloodType
        }
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      alert('Success')
      return res.data;
    } catch (error) {
      console.error(error);
      alert("Something went wrong, see console");
      return [];
    }
  };

  const setLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div id='doctor-component-wrapper' className='doctor-component-wrapper'>
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
                <button id='create-new-user-button' className='admin-account-component-grid-2-create-user-button' onClick={openNewUserModal}>Create a new user</button>
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
              isOpen={modalRoomIsOpen}
              onRequestClose={closeModal}
              onAfterOpen={handleGetRooms}
              contentLabel="Room ID and Password"
            >
              <h2>Active rooms</h2>
              <div className="admin-rooms-modal-window-info">
                {rooms.map((room) => (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <hr style={{ margin: '10px 0 5px 0', height: '2px', width: '160px', color: 'black' }} />
                    <span className="admin-rooms-modal-window-info-text">Room Id: <span style={{ color: 'red', fontWeight: 'bold' }}>{room.roomId === '' ? 'N/A' : room.roomId}</span></span>
                    <span className="admin-rooms-modal-window-info-text">Pass: <span style={{ color: 'red', fontWeight: 'bold' }}>{room.password === '' ? 'N/A' : room.password }</span></span>
                    <span className="admin-rooms-modal-window-info-text">Owner: <span style={{ fontWeight: 'bold' }}>{room.createdBy === '' ? 'N/A' : room.createdBy }</span></span>
                  <span className="admin-rooms-modal-window-info-text">Creation time: <span style={{ fontWeight: 'bold' }}>{room.startTime === null ? 'N/A' : room.startTime }</span></span>
                    <button onClick={() => {
                      setAdminRoomCreate(true)
                      navigate(`/room/${room.roomId}`)
                    }} className='admin-rooms-modal-window-button'>Join</button>
                  </div>
                ))}
              </div>
              <button className="room-modal-window-button" onClick={closeModal}>Close</button>
            </Modal>

            <Modal
              className={"admin-new-user-modal-window-wrapper"}
              isOpen={modalNewUserIsOpen}
              onRequestClose={closeModal}
              contentLabel="Create a new user"
              style={ModalNewUser}
            >
              <h2>Create a new user</h2>
              <hr style={{ margin: '15px 0', opacity: '50%' }} />
              <div className="admin-new-user-modal-window-form">
                <div className="admin-new-user-modal-window-input-wrapper">
                  <label htmlFor="login">Login:</label>
                  <input type="text" className="admin-new-user-modal-window-input" value={newLogin} onChange={(event) => setNewLogin(event.target.value)} />
                </div>
                <div className="admin-new-user-modal-window-input-wrapper">
                  <label htmlFor="password">Password:</label>
                  <input type="text" className="admin-new-user-modal-window-input" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} />
                </div>
                <hr style={{ margin: '15px 0', opacity: '50%' }} />
                <div className="admin-new-user-modal-window-input-wrapper">
                  <label htmlFor="email">Email:</label>
                  <input type="email" className="admin-new-user-modal-window-input" value={newEmail} onChange={(event) => setNewEmail(event.target.value)} />
                </div>
                <div className="admin-new-user-modal-window-input-wrapper">
                  <label htmlFor="phone">Phone:</label>
                  <input type="tel" className="admin-new-user-modal-window-input" value={newPhone} onChange={(event) => setNewPhone(event.target.value)} />
                </div>
                <div className="admin-new-user-modal-window-input-wrapper">
                  <label htmlFor="name">Name:</label>
                  <input type="text" className="admin-new-user-modal-window-input" value={newName} onChange={(event) => setNewName(event.target.value)} />
                </div>
                <div className="admin-new-user-modal-window-input-wrapper">
                  <label htmlFor="surname">Surname:</label>
                  <input type="text" className="admin-new-user-modal-window-input" value={newSurname} onChange={(event) => setNewSurname(event.target.value)} />
                </div>
                <div className="admin-new-user-modal-window-input-wrapper">
                  <label htmlFor="gender">Gender:</label>
                  <select className="admin-new-user-modal-window-input" value={newGender} onChange={(event) => setNewGender(event.target.value)}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="admin-new-user-modal-window-input-wrapper">
                  <label htmlFor="birthday">Birthday:</label>
                  <input type="date" className="admin-new-user-modal-window-input" value={newBirthday} onChange={(event) => setNewBirthday(event.target.value)} />
                </div>
                <hr style={{ margin: '15px 0', opacity: '50%' }} />
                <div className="admin-new-user-modal-window-input-wrapper">
                  <label htmlFor="address">Address:</label>
                  <input type="text" className="admin-new-user-modal-window-input" value={newAddress} onChange={(event) => setNewAddress(event.target.value)} />
                </div>
                <div className="admin-new-user-modal-window-input-wrapper">
                  <label htmlFor="city">City:</label>
                  <input type="text" className="admin-new-user-modal-window-input" value={newCity} onChange={(event) => setNewCity(event.target.value)} />
                </div>
                <div className="admin-new-user-modal-window-input-wrapper">
                  <label htmlFor="country">Country:</label>
                  <input type="text" className="admin-new-user-modal-window-input" value={newCountry} onChange={(event) => setNewCountry(event.target.value)} />
                </div>
                <div className="admin-new-user-modal-window-input-wrapper">
                  <label htmlFor="zipcode">Zipcode:</label>
                  <input type="text" className="admin-new-user-modal-window-input" value={newZipcode} onChange={(event) => setNewZipcode(event.target.value)} />
                </div>
                <hr style={{ margin: '15px 0', opacity: '50%' }} />
                <div className="admin-new-user-modal-window-input-wrapper">
                  <label htmlFor="overall">Overall:</label>
                  <input type="text" className="admin-new-user-modal-window-input" value={newOverall} onChange={(event) => setNewOverall(event.target.value)} />
                </div>
                <div className="admin-new-user-modal-window-input-wrapper">
                  <label htmlFor="Blood_type">Blood type:</label>
                  <select className="admin-new-user-modal-window-input" value={newBloodType} onChange={(event) => setNewBloodType(event.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
                <hr style={{ margin: '15px 0', opacity: '50%' }} />
                <div className="admin-new-user-modal-window-input-wrapper">
                  <label htmlFor="user_role">User Role:</label>
                  <select className="admin-new-user-modal-window-input" value={newAccessLevel} onChange={(event) => setNewAccessLevel(event.target.value)}>
                    <option value="20">User</option>
                    <option value="25">Doctor</option>
                  </select>
                </div>
                <div className="admin-new-user-modal-window-input-wrapper">
                  <label htmlFor="profile_pic">Profile picture (direct link):</label>
                  <input type="text" className="admin-new-user-modal-window-input" value={newProfilePic} onChange={(event) => setNewProfilePic(event.target.value)} />
                </div>
              </div>
              <button className="room-modal-window-button" onClick={createUser}>Submit</button>
            </Modal>

            <div className="doctor-account-component-client-base">Client Base</div>

            <div className="doctor-account-component-client-base-area">
              <input value={searchName} onChange={(event) => setSearchName(event.target.value)} style={{ width: '70px', marginRight: '10px' }} placeholder='Name'></input>
              <input value={searchSurname} onChange={(event) => setSearchSurname(event.target.value)} style={{ width: '70px', marginRight: '10px' }} placeholder='Surname'></input>
              <select value={searchAccessLevel} onChange={(event) => setSearchAccessLevel(event.target.value)} style={{ width: '70px', marginRight: '10px' }} name="Role">
                <option value=""></option>
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