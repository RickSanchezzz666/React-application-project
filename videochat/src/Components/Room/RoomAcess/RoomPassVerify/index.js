import React, { useState, useEffect, useContext } from "react";
import './style.css'
import axios from 'axios';
import WebFont from 'webfontloader';
import logo from '../../../../images/logo_blue.png'
import { Link } from "react-router-dom";
import { MyContext } from '../../../GlobalContex';

const RoomPassVerify = ({ children }) => {
  const [verify, setVerify] = useState(false);
  const [callPass, setCallPass] = useState('');
  const [doctorRoomCreate, setDoctorRoomCreate] = useContext(MyContext);
  const [adminRoomCreate, setAdminRoomCreate] = useContext(MyContext);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Arvo']
      }
    });
    document.title = "Redirecting... | MedDoc";
  }, []);


  let pathName = window.location.pathname;
  let roomId = pathName.slice(6, 42);

  function redirectToCall() {
    if (callPass) {
      axios.get('/api/room-pass-verify', {
        params: {
          roomId: roomId,
          password: callPass
        },
      })
        .then((res) => {
          if (res.status === 200) {
            setVerify(true);
          }
        })
        .catch((err) => {
          setVerify(false);
        })
    }
  }

  return (adminRoomCreate || doctorRoomCreate) ? (
    children
  ) : verify ? (
    children
  ) : (
    <div className="password-redirecting-page">
      <div className="header-logo-room">
        <Link to='/' className="header-router"><img className="room-logo" src={logo} /></Link>
        <Link to='/' className="header-router"><span className="room-logo-name">MedDoc</span></Link>
      </div>
      <div className="password-redirecting-page-input-wrapper">
        <div className="password-redirecting-page-input-text">Enter the Password to connect to <span className="password-redirecting-page-text-color">{roomId}</span></div>
        <input type="text" id="password-redirecting-page-input" className="password-redirecting-page-input" onChange={(event) => setCallPass(event.target.value)} />
        <button className="meeting-join-button" onClick={redirectToCall}>Confirm the Password</button>
      </div>
    </div>
  )
}

export default RoomPassVerify;