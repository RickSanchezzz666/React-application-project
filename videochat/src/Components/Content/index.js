import React from "react";
import './style.css';
import MedDocLogo from "./imgs/MedDoc.png";
import socket from "../../Socket";
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

function Content () {
    return (
        <div className="mainpage">
            <img className="unicore-logo" src={MedDocLogo} alt="Not Found" data-aos="fade-down" data-aos-delay="100"/>
            <a href="room" className="startButton" data-aos="fade-up" data-aos-delay="200">Start meeting<br/>(temporary unavaible)</a>
        </div>
    )
}

export default Content;