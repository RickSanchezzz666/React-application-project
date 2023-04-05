import React from "react";
import './style.css';
import AOS from 'aos';
import { useNavigate } from "react-router";

AOS.init();

function NotFoundRoom() {
    const history = useNavigate();

    return (
        <div className="NotFoundRoom">
            <h1 className="main-text" data-aos="fade-right" data-aos-delay="100">Error 404</h1>
            <h2 className="sub-text" data-aos="fade-left" data-aos-delay="200">Room not Found : (</h2>
            <button onClick={() => {
                history('/');
            }} className="back-button">Go to mainpage</button>
        </div>
    )
}

export default NotFoundRoom;