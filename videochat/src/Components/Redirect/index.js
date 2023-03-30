import React from "react";
import './style.css'
import { useParams } from "react-router";
import camera from '../Room/imgs/camera.png';
import cameraOff from '../Room/imgs/camera-off.png';
import microphone from '../Room/imgs/microphone.png';
import microphoneOff from '../Room/imgs/microphone-off.png';
import phone from '../Room/imgs/phone-call.png';
import logo from '../Room/imgs/logo_blue.png';
import useWebRTC, { LOCAL_VIDEO, userStream } from "../../hooks/useWebRTC";
import { Link } from "react-router-dom";
import WebFont from 'webfontloader';
import { useEffect } from "react";
export {videoSwitch, audioSwitch}

let videoSwitch = true;
let audioSwitch = true;

function Redirect() {
    function layout(clientsNumber = 1) {
        const pairs = Array.from({length: clientsNumber}).reduce((acc, next, index, arr) => {
            if (index % 2 === 0) {
                acc.push(arr.slice(index, index + 2))
            }
    
            return acc;
        }, [])
    
        let height = `65%`
       
        return pairs.map((row, index, arr) => {
            if (index === arr.length - 1 && row.length === 1) {
                return [{
                    width: '65%',
                    height,
                }]
            }
    
            return row.map(() => ({
                width: '65%',
                height
            }))
        }).flat()
    }
    useEffect(() => {
        WebFont.load({
          google: {
            families: ['Arvo']
          }
        });
       }, []);

    const {id: roomID} = useParams();
    const {clients, provideMediaRef} = useWebRTC(roomID);
    const videoLayout = layout(clients.length);

    const videoButton = document.getElementById('redirect-off-video-button');
    const audioButton = document.getElementById('redirect-off-audio-button');

    const leaveButton = document.getElementById('room-call-leave')

    let pathName = window.location.pathname;
    let pathNameSlice = pathName.slice(10, 46);
    let redirectPath = `/room/${pathNameSlice}`;

    function redirectTurnOffVideo() {
        if(videoButton) {
            const videoTrack = userStream.getVideoTracks()[0];
            if (videoTrack.enabled) {
                videoTrack.enabled = false;
                videoButton.className = 'room-button video-button-off';
                videoButton.innerHTML = `<img src=${cameraOff} alt="Camera Off">`;
                videoSwitch = false;
            } else {
                videoTrack.enabled = true;
                videoButton.className = 'room-button video-button-on';
                videoButton.innerHTML = `<img src=${camera} alt="Camera On">`;
                videoSwitch = true;
            }
        }
    }


    function redirectTurnOffAudio() {
        if(audioButton) {
            const audioTrack = userStream.getAudioTracks()[0];
            if (audioTrack.enabled) {
                audioTrack.enabled = false;
                audioButton.className = 'room-button video-button-off';
                audioButton.innerHTML = `<img src=${microphoneOff} alt="Microphone Off">`
                audioSwitch = false;
            } else {
                audioTrack.enabled = true;
                audioButton.className = 'room-button video-button-on';
                audioButton.innerHTML = `<img src=${microphone} alt="Microphone On">`
                audioSwitch = true;
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


    return(
        <div className="redirect-component">
            <div className="header-logo-room">
                <img className="room-logo" src={logo}></img>
                <span className="room-logo-name">MedDoc</span>
            </div>

            {clients.map((clientID, index) => {
                return (
                    <div className="redirect-video-source" key={clientID} style={videoLayout[index]}>
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