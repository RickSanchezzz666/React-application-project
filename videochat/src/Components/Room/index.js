import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useWebRTC, { LOCAL_VIDEO, userStream } from "../../hooks/useWebRTC";
import './style.css';
import logo from './imgs/logo_blue.png';
import microphone from './imgs/microphone.png';
import microphoneOff from './imgs/microphone-off.png';
import phone from './imgs/phone-call.png';
import settings from './imgs/setting.png';
import camera from './imgs/camera.png';
import cameraOff from './imgs/camera-off.png';
import WebFont from 'webfontloader';
import { Link } from 'react-router-dom';
import { videoSwitch, audioSwitch } from "../Redirect";
export {redirectAvailability};

let redirectAvailability = true;
let redirectCompleted = false;

function layout(clientsNumber = 1) {
    const pairs = Array.from({length: clientsNumber}).reduce((acc, next, index, arr) => {
        if (index % 2 === 0) {
            acc.push(arr.slice(index, index + 2))
        }

        return acc;
    }, [])

    const rowsNumber = pairs.length;
    let height = `${70 / rowsNumber}%`
    if (rowsNumber === 3) {
        height = `${60 / rowsNumber}%`
    }
   
    return pairs.map((row, index, arr) => {
        if (index === arr.length - 1 && row.length === 1) {
            return [{
                width: '70%',
                height,
            }]
        }

        return row.map(() => ({
            width: '32.5%',
            height
        }))
    }).flat()
}



function Room () {
    useEffect(() => {
        WebFont.load({
          google: {
            families: ['Arvo']
          }
        });
        document.title = "Room | MedDoc";
       }, []);


    const {id: roomID} = useParams();
    const {clients, provideMediaRef} = useWebRTC(roomID);
    const videoLayout = layout(clients.length);

    let clientsLength = clients.length;

    /*if(clientsLength - 1 === 0 || clientsLength - 1 === -1) {
        redirectCompleted = true;
        if(redirectCompleted === true) {
            redirectAvailability = false;
        }
    } else {
        redirectCompleted = false;
        if(redirectCompleted === false) {
            redirectAvailability = true;
        }
    }*/

    const navigate = useNavigate();

    let pathName = window.location.pathname;
    let pathNameSlice = pathName.slice(6, 42);
    let redirectPath = `/redirect/${pathNameSlice}`;

        if(redirectCompleted === false) {
            if(redirectAvailability === true) {
                setTimeout(() => {
                    navigate(redirectPath);
                    redirectAvailability = false;
                    redirectCompleted = true;
                }, 0);
            }
        }

    const videoButton = document.getElementById('off-video-button');
    const audioButton = document.getElementById('off-audio-button');

    const leaveButton = document.getElementById('room-call-leave')

    if(videoSwitch === false) {
        turnOffVideo();
    }
    if(audioSwitch === false) {
        turnOffAudio();
    }
    
    
    function turnOffVideo() {
        if(videoButton) {
            const videoTrack = userStream.getVideoTracks()[0];
            if (videoTrack.enabled) {
                videoTrack.enabled = false;
                videoButton.className = 'room-button video-button-off';
                videoButton.innerHTML = `<img src=${cameraOff} alt="Camera Off">`;
            } else {
                videoTrack.enabled = true;
                videoButton.className = 'room-button video-button-on';
                videoButton.innerHTML = `<img src=${camera} alt="Camera On">`;
            }
        }
    }


    function turnOffAudio() {
        if(audioButton) {
            const audioTrack = userStream.getAudioTracks()[0];
            if (audioTrack.enabled) {
                audioTrack.enabled = false;
                audioButton.className = 'room-button video-button-off';
                audioButton.innerHTML = `<img src=${microphoneOff} alt="Microphone Off">`
            } else {
                audioTrack.enabled = true;
                audioButton.className = 'room-button video-button-on';
                audioButton.innerHTML = `<img src=${microphone} alt="Microphone On">`
            }
        }
    }

    function callLeave() {
        if(leaveButton) {
            userStream.getTracks().forEach(track => track.stop());
                setTimeout(() => {
                    window.location.reload()
                }, 0);
        }
    }

    console.log(clients);

    return (

        <div className="room-wrapper" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            height: '100vh',
            width: '100vw',
        }}>
            
            <div className="header-logo-room">
                <img className="room-logo" src={logo}></img>
                <span className="room-logo-name">MedDoc</span>
            </div>
            {clients.map((clientID, index) => {
                return (
                    <div className="video-source" key={clientID} style={videoLayout[index]}>
                        <video 
                            width='100%'
                            height='100%'
                            ref={instance => {
                                provideMediaRef(clientID, instance);
                            }}
                            autoPlay
                            playsInline
                            muted={clientID === LOCAL_VIDEO}
                        />
                    </div>
                )
            })}
            <div className="room-emptiness"></div>
            <div className="room-footer">
                <div className="room-buttons">
                    <button className="room-button" id="room-settings">
                        <img src={settings}></img>
                    </button>
                    <button onClick={turnOffAudio} className="room-button audio-button-on" id="off-audio-button">
                        <img src={microphone}></img>
                    </button>
                    <button onClick={turnOffVideo} className="room-button video-button-on" id="off-video-button">
                        <img src={camera}></img>
                    </button>
                    <Link className="room-button-text" to='/'>
                        <button onClick={callLeave} className="room-button" id="room-call-leave">
                            <img src={phone}></img>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Room;