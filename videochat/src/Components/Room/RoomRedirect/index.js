import React, { useState, useEffect, useRef } from "react";
import './style.css'
import axios from "axios";
import camera from '../imgs/camera.png';
import cameraOff from '../imgs/camera-off.png';
import microphone from '../imgs/microphone.png';
import microphoneOff from '../imgs/microphone-off.png';
import phone from '../imgs/phone-call.png';
import logo from '../imgs/logo_blue.png';
import { Link } from "react-router-dom";
import WebFont from 'webfontloader';
import Webcam from "react-webcam";

const Redirect = ({ children }) => {
    const [redirected, setIsRedirected] = useState(false);
    const [audioSwitch, setAudioSwitch] = useState(true);
    const [videoSwitch, setVideoSwitch] = useState(true);
    const [accessLevel, setaccessLevel] = useState("");

    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Arvo']
            }
        });
        document.title = "Redirecting... | MedDoc";
    }, []);

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) {
            axios.get("/api/gatekeeper", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => {
                if (res.status === 200) {
                    const { access_level } = res.data;
                    setaccessLevel(access_level);
                }
            }).catch((err) => {
                console.log(err);
            });
        } else {
            console.log("Something went wrong!");
        }
    }, []);

    const leaveButton = useRef();

    const videoButton = useRef();
    const audioButton = useRef();

    function redirectTurnOffVideo() {
        const videoSource = document.getElementById('redirect-video-source')
        if (videoButton.current && videoSource) {
            if (videoSwitch === true) {
                videoButton.current.className = 'room-button video-button-off';
                videoSource.className = 'redirect-video-source redirect-video-source-off'
                videoButton.current.innerHTML = `<img src=${cameraOff} alt="Camera Off">`;
                setVideoSwitch(false);
            } else {
                videoButton.current.className = 'room-button video-button-on';
                videoSource.className = 'redirect-video-source'
                videoButton.current.innerHTML = `<img src=${camera} alt="Camera On">`;
                setVideoSwitch(true);
            }
        }
    }


    function redirectTurnOffAudio() {
        if (audioButton.current) {
            if (audioSwitch === true) {
                audioButton.current.className = 'room-button video-button-off';
                audioButton.current.innerHTML = `<img src=${microphoneOff} alt="Microphone Off">`
                setAudioSwitch(false);
            } else {
                audioButton.current.className = 'room-button video-button-on';
                audioButton.current.innerHTML = `<img src=${microphone} alt="Microphone On">`
                setAudioSwitch(true);
            }
        }
    }

    function callLeave() {
        if (leaveButton) {
            setTimeout(() => {
                window.location.reload()
            }, 0);
        }
    }

    function joinMeeting() {
        setIsRedirected(true);
    }

    function reloadFunc() {
        setTimeout(() => {
            window.location.reload()
        }, 0);
    }

    return redirected ? (
        React.cloneElement(children, { videoSwitch, audioSwitch })
    ) : (
        <div className="redirect-component">
            <div className="header-logo-room">
                <Link to='/' className="header-router" onClick={reloadFunc}><img className="room-logo" src={logo} /></Link>
                <Link to='/' className="header-router" onClick={reloadFunc}><span className="room-logo-name">MedDoc</span></Link>
            </div>
            <div className="redirect-header-text">Ready to Join?</div>
            <Webcam className="redirect-video-source" id="redirect-video-source"
                height={720}
                width={1280}
                audio={false}
            />
            <div className="redirect-button-wrapper">
                <button onClick={redirectTurnOffAudio} ref={audioButton} className="room-button audio-button-on" id="redirect-off-audio-button">
                    <img src={microphone}></img>
                </button>
                <button onClick={redirectTurnOffVideo} ref={videoButton} className="room-button video-button-on" id="redirect-off-video-button">
                    <img src={camera}></img>
                </button>
                <Link className="room-button-text" to='/'>
                    <button onClick={callLeave} ref={leaveButton} className="room-button" id="room-call-leave">
                        <img src={phone}></img>
                    </button>
                </Link>
            </div>
            <button onClick={joinMeeting} className="redirect-join-button" id="redirect-join-button">Join Meeting</button>
        </div>
    )
}

export default Redirect;