import React, { useState } from "react";
import './style.css'
import { useNavigate } from "react-router";
import WebFont from 'webfontloader';
import { useEffect } from "react";
export {redirectAvailability};

let redirectAvailability = true;

function RedirectingPage() {

    useEffect(() => {
        WebFont.load({
          google: {
            families: ['Arvo']
          }
        });
        document.title = "Redirecting... | MedDoc";
       }, []);

    const navigate = useNavigate();

    let pathName = window.location.pathname;
    let pathNameSlice = pathName.slice(13, 42);
    let redirectPath = `/redirect/${pathNameSlice}`;

    const [callPass, setCallPass] = useState('');

    function redirectToCall() {

    }

    if(redirectAvailability === true) {
        setTimeout(() => {
            navigate(redirectPath);
            redirectAvailability = false;
        }, 150000);
    }


    return(
    <div className="password-redirecting-page">
        <div className="password-redirecting-page-input-wrapper">
            <div className="password-redirecting-page-input-text">Enter the Password to connect to <span className="password-redirecting-page-text-color">{pathNameSlice}</span></div>
            <input type="text" id="password-redirecting-page-input" className="password-redirecting-page-input" onChange={(event) => setCallPass(event.target.value)} />
            <button className="meeting-join-button" onClick={redirectToCall}>Confirm the Password</button>  
        </div>
    </div>
    )
}

export default RedirectingPage;