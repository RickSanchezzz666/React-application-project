import './style.css';
import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../Socket";
import Header from '../Header/Header'
import ACTIONS from "../../Socket/actions";
import axios from "axios";
import WebFont from 'webfontloader';
import { MyContext } from '../GlobalContex';
export { id, password };

let id = '';
let password = '';

const getUsers = async (token) => {
  try {
    const res = await axios.get("/api/users", {
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
  const [doctorRoomCreate, setDoctorRoomCreate] = useContext(MyContext);

  const [searchName, setSearchName] = useState();
  const [searchSurname, setSearchSurname] = useState();
  const [searchAccessLevel, setSearchAccessLevel] = useState();
  const [searchCountry, setSearchCountry] = useState();
  const [searchCity, setSearchCity] = useState();
  const [searchAddress, setSearchAddress] = useState();
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
            <span className="doctor-account-component-grid-profile-text" style={{ color: "green", marginTop: "20px" }}>Doctor</span>
            <div className="doctor-account-component-grid-log-out">
              <button className='doctor-account-component-grid-log-out-button' onClick={setLogout}>Log out</button>
            </div>
          </div>
        </div>
        <div className='doctor-account-component-grid-2'>
          <div className="doctor-account-component-grid-2-section">
            <div className="doctor-account-component-grid-2-start-meeting">
              <button className='doctor-account-component-grid-2-start-meeting-button' onClick={startMeeting}>Start meeting</button>
            </div>

            <div className="doctor-account-component-client-base">Client Base</div>

            <div className="doctor-account-component-client-base-area">
              <input value={searchName} onChange={(event) => setSearchName(event.target.value)} style={{ width: '70px', marginRight: '10px' }} placeholder='Name'></input>
              <input value={searchSurname} onChange={(event) => setSearchSurname(event.target.value)} style={{ width: '70px', marginRight: '10px' }} placeholder='Surname'></input>
              <select value={searchAccessLevel} onChange={(event) => setSearchAccessLevel(event.target.value)} style={{ width: '90px', marginRight: '10px' }} name="Role">
                <option style={{ fontStyle: 'italic' }} selected>User role</option>
                <option value="20">User</option>
                <option value="25">Doctor</option>
                <option value="30">Admin</option>
              </select>
              <input value={searchCountry} onChange={(event) => setSearchCountry(event.target.value)} style={{ width: '70px', marginRight: '10px' }} placeholder='Country'></input>
              <input value={searchCity} onChange={(event) => setSearchCity(event.target.value)} style={{ width: '70px', marginRight: '10px' }} placeholder='City'></input>
              <input value={searchAddress} onChange={(event) => setSearchAddress(event.target.value)} style={{ width: '70px', marginRight: '10px' }} placeholder='Address'></input>
              <select value={searchBloodType} onChange={(event) => setSearchBloodType(event.target.value)} style={{ width: '90px', marginRight: '10px' }} placeholder='Blood type'>
                <option style={{ fontStyle: 'italic' }} selected>Blood type</option>
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
  );
};

export default DoctorsAccount;