import React, { useState } from "react";
import './style.css'
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import WebFont from 'webfontloader';
import { useEffect } from "react";

const RedirectingPage = ({ children }) => {
    const [verify, setVerify] = useState(false);
    const [callPass, setCallPass] = useState('');

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
            axios.get('/api/password-verify', {
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

    return verify ? (
        React.cloneElement({children})
    ) : (
    <div className="password-redirecting-page">
        <div className="password-redirecting-page-input-wrapper">
            <div className="password-redirecting-page-input-text">Enter the Password to connect to <span className="password-redirecting-page-text-color">{roomId}</span></div>
            <input type="text" id="password-redirecting-page-input" className="password-redirecting-page-input" onChange={(event) => setCallPass(event.target.value)} />
            <button className="meeting-join-button" onClick={redirectToCall}>Confirm the Password</button>  
        </div>
    </div>
    )
}

export default RedirectingPage;