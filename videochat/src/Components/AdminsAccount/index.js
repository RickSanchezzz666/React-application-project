import './style.css';
import React, { useState, useRef, useEffect, } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../Header/Header'
import axios from "axios";
import WebFont from 'webfontloader';
import Modal from 'react-modal';
import moment from 'moment/moment';
export { adminId, adminPassword }

let adminId = '';
let adminPassword = '';

Modal.setAppElement(document.getElementById('doctor-component-wrapper'));

const AdminsAccount = ({ name, surname, profilePic }) => {
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [userAppointments, setUserAppointments] = useState([]);

  const [modalRoomIsOpen, setModalRoomIsOpen] = useState(false);
  const [modalNewUserIsOpen, setModalNewUserIsOpen] = useState(false);
  const [modalUserIsOpen, setModalUserIsOpen] = useState(false);
  const [modalAppointmentIsOpen, setModalAppointmentIsOpen] = useState(false);
  const [modalNewMeetingIsOpen, setModalNewMeetingIsOpen] = useState(false);
  const [modalUserAppointmentIsOpen, setModalUserAppointmentsIsOpen] = useState(false);


  const [searchName, setSearchName] = useState();
  const [searchSurname, setSearchSurname] = useState();
  const [searchAccessLevel, setSearchAccessLevel] = useState();
  const [searchCountry, setSearchCountry] = useState();
  const [searchCity, setSearchCity] = useState();
  const [searchAddress, setSearchAddress] = useState();
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
  const [newBirthday, setNewBirthday] = useState("01.01.1800");
  const [newGender, setNewGender] = useState("Male");
  const [newAddress, setNewAddress] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [newZipcode, setNewZipcode] = useState("");
  const [newOverall, setNewOverall] = useState("");
  const [newBloodType, setNewBloodType] = useState("I-");

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserAppointments, setSelectedUserAppointments] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [appointmentForUser, setAppointmentForUser] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState("");

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
    setModalAppointmentIsOpen(false);
    setModalUserIsOpen(false);
    setModalNewMeetingIsOpen(false);
    setModalUserAppointmentsIsOpen(false);
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
    try {
      if (selectedAppointment !== null) {
        await axios.put("/api/appointment-update", {
          id: selectedAppointment,
          roomId: adminId,
          roomPass: adminPassword
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      const res = await axios.post("/api/create-new-room", {
        roomId: adminId,
        password: adminPassword,
        startTime: Date.now(),
        createdBy: `${name} ${surname}`,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(`/room/${adminId}`);
      return res.data;
    } catch (error) {
      return [];
    }
  };

  async function openRoomsModal() {
    setModalRoomIsOpen(true)
  }

  async function openNewUserModal() {
    setModalNewUserIsOpen(true)
  }

  async function openNewMeetingModal() {
    setModalNewMeetingIsOpen(true)
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
          address: searchAddress,
          blood_type: searchBloodType,
        }
      });
      return res.data;
    } catch (error) {
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

  async function getAppointments() {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("/api/get-appointments", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return setAppointments(res.data);
    } catch (error) {
      return [];
    };
  };

  async function getUserAppointments() {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("/api/get-appointments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          forUserId: selectedUserAppointments
        }
      });
      return setUserAppointments(res.data);
    } catch (error) {
      return [];
    };
  }

  async function handleDeleteAppointment(_id) {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post('/api/delete-appointment', {
        _id
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      return res.status;
    } catch (error) {
      return [];
    }
  }

  async function handleDeleteRoom(roomId) {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post("/api/delete-room", {
        roomId
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return res.status;
    } catch (error) {
      return [];
    }
  };

  const handleUserToModal = (user) => {
    setModalUserIsOpen(true);
    setSelectedUser(user);
  };

  const handleUserAppointmentToModal = (user) => {
    setModalAppointmentIsOpen(true);
    setAppointmentForUser(user);
  };

  const handleUserAppointmentsModal = (user) => {
    setModalUserAppointmentsIsOpen(true);
    setSelectedUserAppointments(user);
  }

  const ModalUserInfo = () => {
    if (!selectedUser) {
      return null;
    }

    return (
      <Modal
        className={"admin-new-user-modal-window-wrapper"}
        isOpen={modalUserIsOpen}
        onRequestClose={closeModal}
        contentLabel="User info"
        style={ModalNewUser}
      >
        <div className="admin-modal-window-grid">
          <h2>User Info</h2>
          <button className='account-modal-window-button-invisible' onClick={closeModal}><span className="account-modal-window-close-button"></span></button>
        </div>
        <hr style={{ margin: '15px 0', opacity: '50%' }} />
        <div className="admin-new-user-modal-window-form">
          <div className="admin-new-user-modal-window-input-wrapper">
            <img className="doctor-account-component-grid-1-icon" src={selectedUser.user_info.profile_pic}></img>
          </div>
          <div className="admin-new-user-modal-window-input-wrapper">
            <label htmlFor="login">Login:</label>
            <input type="text" className="admin-new-user-modal-window-input" value={selectedUser.user_info.login} disabled />
          </div>
          <div className="admin-new-user-modal-window-input-wrapper">
            <label htmlFor="password">Password:</label>
            <input type="text" className="admin-new-user-modal-window-input" value={selectedUser.user_info.password} disabled />
          </div>
          <hr style={{ margin: '15px 0', opacity: '50%' }} />
          <div className="admin-new-user-modal-window-input-wrapper">
            <label htmlFor="email">Email:</label>
            <input type="text" className="admin-new-user-modal-window-input" value={selectedUser.user_info.email} disabled />
          </div>
          <div className="admin-new-user-modal-window-input-wrapper">
            <label htmlFor="phone">Phone:</label>
            <input type="tel" className="admin-new-user-modal-window-input" value={selectedUser.user_info.phone} disabled />
          </div>
          <div className="admin-new-user-modal-window-input-wrapper">
            <label htmlFor="name">Name:</label>
            <input type="text" className="admin-new-user-modal-window-input" value={selectedUser.user_info.name} disabled />
          </div>
          <div className="admin-new-user-modal-window-input-wrapper">
            <label htmlFor="surname">Surname:</label>
            <input type="text" className="admin-new-user-modal-window-input" value={selectedUser.user_info.surname} disabled />
          </div>
          <div className="admin-new-user-modal-window-input-wrapper">
            <label htmlFor="gender">Gender:</label>
            <input type="text" className="admin-new-user-modal-window-input" value={selectedUser.user_info.gender} disabled />
          </div>
          <div className="admin-new-user-modal-window-input-wrapper">
            <label htmlFor="birthday">Birthday:</label>
            <input type="text" className="admin-new-user-modal-window-input" value={selectedUser.user_info.birthday} disabled />
          </div>
          <hr style={{ margin: '15px 0', opacity: '50%' }} />
          <div className="admin-new-user-modal-window-input-wrapper">
            <label htmlFor="address">Address:</label>
            <input type="text" className="admin-new-user-modal-window-input" value={selectedUser.location_info.address} disabled />
          </div>
          <div className="admin-new-user-modal-window-input-wrapper">
            <label htmlFor="city">City:</label>
            <input type="text" className="admin-new-user-modal-window-input" value={selectedUser.location_info.city} disabled />
          </div>
          <div className="admin-new-user-modal-window-input-wrapper">
            <label htmlFor="country">Country:</label>
            <input type="text" className="admin-new-user-modal-window-input" value={selectedUser.location_info.country} disabled />
          </div>
          <div className="admin-new-user-modal-window-input-wrapper">
            <label htmlFor="zipcode">Zipcode:</label>
            <input type="text" className="admin-new-user-modal-window-input" value={selectedUser.location_info.zipcode} disabled />
          </div>
          <hr style={{ margin: '15px 0', opacity: '50%' }} />
          <div className="admin-new-user-modal-window-input-wrapper">
            <label htmlFor="overall">Overall:</label><br />
            <textarea type="text" className="admin-new-user-modal-window-input" rows={4} cols={50} style={{ resize: 'none' }} value={selectedUser.patient_info.overall} disabled />
          </div>
          <div className="admin-new-user-modal-window-input-wrapper">
            <label htmlFor="Blood_type">Blood type:</label>
            <input type="text" className="admin-new-user-modal-window-input" value={selectedUser.patient_info.blood_type} disabled />
          </div>
          <hr style={{ margin: '15px 0', opacity: '50%' }} />
          <div className="admin-new-user-modal-window-input-wrapper">
            <label htmlFor="user_role">User Role:</label>
            <input type="text" className="admin-new-user-modal-window-input" value={selectedUser.user_info.access_level === 30 ? 'Admin' : selectedUser.user_info.access_level === 25 ? 'Doctor' : selectedUser.user_info.access_level === 20 ? 'User' : selectedUser.user_info.access_level} disabled />
          </div>
          <div className="admin-new-user-modal-window-input-wrapper">
            <label htmlFor="created_by">Created by:</label>
            <input type="text" className="admin-new-user-modal-window-input" value={selectedUser.user_info.createdBy} disabled />
          </div>
          <div className="admin-new-user-modal-window-input-wrapper">
            <label htmlFor="creation_time">Creation time:</label>
            <input type="text" className="admin-new-user-modal-window-input" value={moment(selectedUser.user_info.creationTime).format('llll')} disabled />
          </div>
        </div>
      </Modal>
    );
  };

  const ModalAppointmentCreate = () => {
    if (!appointmentForUser) {
      return null;
    }
    return (
      <Modal
        className={"admin-new-user-modal-window-wrapper"}
        isOpen={modalAppointmentIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add an appointment"
        style={ModalNewUser}
      >
        <h2>Add an appointment</h2>
        <hr style={{ margin: '15px 0', opacity: '50%' }} />
        <span>Client: <br />{appointmentForUser.user_info.name} {appointmentForUser.user_info.surname}</span>
        <input className="admin-new-user-modal-window-input" type="datetime-local" value={appointmentTime} onChange={(event) => setAppointmentTime(event.target.value)} />
        <hr style={{ margin: '15px 0', opacity: '50%' }} />
        <button className="room-modal-window-button" onClick={createAppointment}>Submit</button>
      </Modal>
    );
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
      return [];
    }
  };

  async function createAppointment() {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post("/api/create-new-appointment", {
        createdBy: `${name} ${surname}`,
        forUserId: appointmentForUser,
        forUserName: `${appointmentForUser.user_info.name} ${appointmentForUser.user_info.surname}`,
        appointmentTime: appointmentTime
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      alert('Success')
      return res.data;
    } catch (error) {
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
            <div className="doctor-account-component-grid-log-out">
              <button className='doctor-account-component-grid-log-out-button' onClick={setLogout}>Log out</button>
            </div>
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
                <button className='admin-account-component-grid-2-start-meeting-button' onClick={openNewMeetingModal}>Start meeting</button>
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
                {rooms.length === 0 ? (<span style={{ margin: '15px 0', fontStyle: 'italic' }}>No active rooms</span>) : (rooms.map((room) => (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <hr style={{ margin: '10px 0 5px 0', height: '2px', width: '160px', color: 'black' }} />
                    <span className="admin-rooms-modal-window-info-text">Room Id: <span style={{ color: 'red', fontWeight: 'bold' }}>{room.roomId === '' || room.roomId === null ? 'N/A' : room.roomId}</span></span>
                    <span className="admin-rooms-modal-window-info-text">Pass: <span style={{ color: 'red', fontWeight: 'bold' }}>{room.password === '' || room.password === null ? 'N/A' : room.password}</span></span>
                    <span className="admin-rooms-modal-window-info-text">Attached to: <span style={{ fontWeight: 'bold' }}>{room.attachedTo === '' || room.attachedTo === null ? 'N/A' : room.attachedTo}</span></span>
                    <span className="admin-rooms-modal-window-info-text">Owner: <span style={{ fontWeight: 'bold' }}>{room.createdBy === '' || room.createdBy === null ? 'N/A' : room.createdBy}</span></span>
                    <span className="admin-rooms-modal-window-info-text">Creation time: <span style={{ fontWeight: 'bold' }}>{room.startTime === null ? 'N/A' : moment(room.startTime).format('llll')}</span></span>
                    <button onClick={() => {
                      adminId = room.roomId;
                      adminPassword = room.password;
                      navigate(`/room/${room.roomId}`)
                    }} className='admin-rooms-modal-window-button'>Join</button>
                    <button onClick={async () => {
                      await handleDeleteRoom(room.roomId)
                      handleGetRooms()
                    }} className='admin-rooms-modal-window-button'>Delete</button>
                  </div>
                )))}
              </div>
              <button className="room-modal-window-button" onClick={closeModal}>Close</button>
            </Modal>

            <Modal
              className={"admin-user-modal-appointment-window-wrapper"}
              isOpen={modalUserAppointmentIsOpen}
              onAfterOpen={getUserAppointments}
              onRequestClose={closeModal}
              contentLabel="Appointments"
              style={ModalNewUser}
            >
              <div className='modal-user-appointments' style={{ display: 'grid' }}>
                {userAppointments.length === 0 ? (<span style={{ margin: '15px 0', fontStyle: 'italic' }}>There are no appointments</span>) : (userAppointments.map((userAppointment) => (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <hr style={{ margin: '10px 0 5px 0', height: '2px', width: '160px', color: 'black' }} />

                    <span className='user-account-appointment-list-element-label'>Appointment time: <span style={{ fontStyle: 'italic' }}>{moment(userAppointment.appointmentTime).calendar()}</span></span>
                    <span className='user-account-appointment-list-element-label' style={{ fontSize: '19px' }}>Doctor: <span style={{ fontStyle: 'italic' }}>{userAppointment.createdBy}</span></span>
                    {userAppointment.roomId !== null && userAppointment.roomPass !== null ? (<button onClick={() => {
                      adminId = userAppointment.roomId;
                      adminPassword = userAppointment.roomPass;
                      navigate(`/room/${userAppointment.roomId}`)
                    }} className="admin-account-appointment-connection-button">Connect</button>) : (
                      <span className='user-account-appointment-list-element-label'>There is no available room</span>)}
                    <button onClick={async () => {
                      await handleDeleteAppointment(userAppointment._id)
                      getUserAppointments(userAppointment)
                    }} className='admin-rooms-modal-window-button'>Delete</button>
                  </div>
                )))}
                <button className="room-modal-window-button" onClick={closeModal}>Close</button>
              </div>
            </Modal>

            <Modal
              className={"admin-new-user-modal-window-wrapper"}
              isOpen={modalNewMeetingIsOpen}
              onRequestClose={closeModal}
              onAfterOpen={getAppointments}
              contentLabel="Start new meeting"
              style={ModalNewUser}
            >
              <h2>Start new meeting</h2>
              <hr style={{ margin: '15px 0', opacity: '50%' }} />
              <span>Please select an appointment:</span>
              <select className="admin-new-user-modal-window-input" value={selectedAppointment} onChange={(event) => setSelectedAppointment(event.target.value)}>
                <option value={null}>-</option>
                {appointments.map((appointment) => (
                  <option key={appointment._id} value={appointment._id}>{appointment.forUserName} - {moment(appointment.appointmentTime).calendar()}</option>
                ))}
              </select>
              <hr style={{ margin: '15px 0', opacity: '50%' }} />
              <button className="room-modal-window-button" onClick={startMeeting}>Start</button>
            </Modal>

            <Modal
              className={"admin-new-user-modal-window-wrapper"}
              isOpen={modalNewUserIsOpen}
              onRequestClose={closeModal}
              contentLabel="Create a new user"
              style={ModalNewUser}
            >
              <div className="admin-modal-window-grid">
                <h2>Create a new user</h2>
                <button className='account-modal-window-button-invisible' onClick={closeModal}><span className="account-modal-window-close-button"></span></button>
              </div>
              <hr style={{ margin: '15px 0', opacity: '50%' }} />
              <div className="admin-new-user-modal-window-form">
                <div className="admin-new-user-modal-window-input-wrapper">
                  <label htmlFor="login">Login:</label>
                  <input type="text" className="admin-new-user-modal-window-input" maxLength={22} value={newLogin} onChange={(event) => setNewLogin(event.target.value)} />
                </div>
                <div className="admin-new-user-modal-window-input-wrapper">
                  <label htmlFor="password">Password:</label>
                  <input type="text" className="admin-new-user-modal-window-input" maxLength={22} value={newPassword} onChange={(event) => setNewPassword(event.target.value)} />
                </div>
                <hr style={{ margin: '15px 0', opacity: '50%' }} />
                <div className="admin-new-user-modal-window-input-wrapper">
                  <label htmlFor="email">Email:</label>
                  <input type="email" className="admin-new-user-modal-window-input" value={newEmail} onChange={(event) => setNewEmail(event.target.value)} />
                </div>
                <div className="admin-new-user-modal-window-input-wrapper">
                  <label htmlFor="phone">Phone:</label>
                  <input type="tel" className="admin-new-user-modal-window-input" maxLength={22} value={newPhone} onChange={(event) => setNewPhone(event.target.value)} />
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
                  <input type="text" className="admin-new-user-modal-window-input" maxLength={22} value={newZipcode} onChange={(event) => setNewZipcode(event.target.value)} />
                </div>
                <hr style={{ margin: '15px 0', opacity: '50%' }} />
                <div className="admin-new-user-modal-window-input-wrapper">
                  <label htmlFor="overall">Overall:</label><br />
                  <textarea type="text" className="admin-new-user-modal-window-input" rows={4} cols={50} style={{ resize: 'none' }} value={newOverall} onChange={(event) => setNewOverall(event.target.value)} />
                </div>
                <div className="admin-new-user-modal-window-input-wrapper">
                  <label htmlFor="Blood_type">Blood type:</label>
                  <select className="admin-new-user-modal-window-input" value={newBloodType} onChange={(event) => setNewBloodType(event.target.value)}>
                    <optgroup label='Group I'>
                      <option value="I-">I-</option>
                      <option value="I+">I+</option>
                    </optgroup>
                    <optgroup label='Group II'>
                      <option value="II-">II-</option>
                      <option value="II+">II+</option>
                    </optgroup>
                    <optgroup label='Group III'>
                      <option value="III-">III-</option>
                      <option value="III+">III+</option>
                    </optgroup>
                    <optgroup label='Group IV'>
                      <option value="IV-">IV-</option>
                      <option value="IV+">IV+</option>
                    </optgroup>
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

            <ModalUserInfo />
            <ModalAppointmentCreate />

            <div className="doctor-account-component-client-base">Client Base</div>

            <div className="doctor-account-component-client-base-area">
              <div className='users-search-area'>
                <input className='users-search-input' value={searchName} onChange={(event) => setSearchName(event.target.value)} placeholder='Name'></input>
                <input className='users-search-input' value={searchSurname} onChange={(event) => setSearchSurname(event.target.value)} placeholder='Surname'></input>
                <select className='users-search-input' value={searchAccessLevel} style={{ width: '110px' }} onChange={(event) => setSearchAccessLevel(event.target.value)} name="Role">
                  <option style={{ fontStyle: 'italic' }} value="" selected>User role</option>
                  <option value="20">User</option>
                  <option value="25">Doctor</option>
                  <option value="30">Admin</option>
                </select>
                <input className='users-search-input' value={searchCountry} onChange={(event) => setSearchCountry(event.target.value)} placeholder='Country'></input>
                <input className='users-search-input' value={searchCity} onChange={(event) => setSearchCity(event.target.value)} placeholder='City'></input>
                <input className='users-search-input' value={searchAddress} onChange={(event) => setSearchAddress(event.target.value)} placeholder='Address'></input>
                <select className='users-search-input' value={searchBloodType} style={{ width: '110px' }} onChange={(event) => setSearchBloodType(event.target.value)} placeholder='Blood type'>
                  <option style={{ fontStyle: 'italic' }} value="" selected>Blood type</option>
                  <optgroup label='Group I'>
                    <option value="I-">I-</option>
                    <option value="I+">I+</option>
                  </optgroup>
                  <optgroup label='Group II'>
                    <option value="II-">II-</option>
                    <option value="II+">II+</option>
                  </optgroup>
                  <optgroup label='Group III'>
                    <option value="III-">III-</option>
                    <option value="III+">III+</option>
                  </optgroup>
                  <optgroup label='Group IV'>
                    <option value="IV-">IV-</option>
                    <option value="IV+">IV+</option>
                  </optgroup>
                </select>
                <button id='doctor-get-user' onClick={handleGetUsers}>Search</button><br />
              </div>
              <div className="doctor-account-component-client-base-table">
                <table class="doctor-account-component-client-base-list">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Surname</th>
                      <th className='table_user_acess_level'>User role</th>
                      <th className='table_user_interaction_1'>Appointments</th>
                      <th className='table_user_information'>Information</th>
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
                        <td style={{ textAlign: 'center' }}>
                          <button className='admin-add-appointment-button' onClick={() => handleUserAppointmentToModal(user)}>+</button>
                          <button className='admin-appointment-button' onClick={() => {
                            handleUserAppointmentsModal(user._id);
                          }}>Show</button>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <a className='active_user_interaction' onClick={() => handleUserToModal(user)}>View</a>
                        </td>
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
  );
};

export default AdminsAccount;