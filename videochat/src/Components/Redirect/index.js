import React from "react";
import './style.css'
import camera from '../Room/imgs/camera.png';
import cameraOff from '../Room/imgs/camera-off.png';
import microphone from '../Room/imgs/microphone.png';
import microphoneOff from '../Room/imgs/microphone-off.png';
import phone from '../Room/imgs/phone-call.png';
import logo from '../Room/imgs/logo_blue.png';
import { Link } from "react-router-dom";
import WebFont from 'webfontloader';
import { useEffect } from "react";
import Webcam from "react-webcam";
export {videoSwitch, audioSwitch}


let videoSwitch = true;
let audioSwitch = true;

function Redirect() {
    useEffect(() => {
        WebFont.load({
          google: {
            families: ['Arvo']
          }
        });
        document.title = "Redirecting... | MedDoc";
       }, []);

    const videoButton = document.getElementById('redirect-off-video-button');
    const audioButton = document.getElementById('redirect-off-audio-button');

    const leaveButton = document.getElementById('room-call-leave')

    let pathName = window.location.pathname;
    let pathNameSlice = pathName.slice(10, 46);
    let redirectPath = `/room/${pathNameSlice}`;

    function redirectTurnOffVideo() {
        if(videoButton) {
            if (videoSwitch === true) {
                videoButton.className = 'room-button video-button-off';
                videoButton.innerHTML = `<img src=${cameraOff} alt="Camera Off">`;
                videoSwitch = false;
            } else {
                videoButton.className = 'room-button video-button-on';
                videoButton.innerHTML = `<img src=${camera} alt="Camera On">`;
                videoSwitch = true;
            }
        }
    }


    function redirectTurnOffAudio() {
        if(audioButton) {
            if (audioSwitch === true) {
                audioButton.className = 'room-button video-button-off';
                audioButton.innerHTML = `<img src=${microphoneOff} alt="Microphone Off">`
                audioSwitch = false;
            } else {
                audioButton.className = 'room-button video-button-on';
                audioButton.innerHTML = `<img src=${microphone} alt="Microphone On">`
                audioSwitch = true;
            }
        }
    }

    function callLeave() {
        if(leaveButton) {
            setTimeout(() => {
                window.location.reload()
            }, 0);
        }
    }


    return(
        <div className="redirect-component">
            <div className="header-logo-room">
                <img className="room-logo" src={logo}></img>
                <span className="room-logo-name">MedDoc</span>
            </div>
            <Webcam className="redirect-video-source"
                height={720}
                width={1280}
            />
            <div className="redirect-button-wrapper">
                    <button onClick={redirectTurnOffAudio} className="room-button audio-button-on" id="redirect-off-audio-button">
                        <img src={microphone}></img>
                    </button>
                    <button onClick={redirectTurnOffVideo} className="room-button video-button-on" id="redirect-off-video-button">
                        <img src={camera}></img>
                    </button>
                    <Link className="room-button-text" to='/'>
                        <button onClick={callLeave} className="room-button" id="room-call-leave">
                            <img src={phone}></img>
                        </button>
                    </Link>
            </div>
            <div className="redirect-join-button" id="redirect-join-button">
                <Link className="redirect-link" to={redirectPath}>
                    Join Meeting
                </Link>
            </div>
        </div>
    )
}

export default Redirect;