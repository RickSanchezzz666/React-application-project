import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useWebRTC, { LOCAL_VIDEO, userStream } from "../../hooks/useWebRTC";
import './style.css';
import logo from '../Content/imgs/logo_blue.png';
import microphone from '../Content/imgs/microphone.png';
import microphoneOff from '../Content/imgs/microphone-off.png';
import phone from '../Content/imgs/phone-call.png';
import settings from '../Content/imgs/setting.png';
import camera from '../Content/imgs/camera.png';
import cameraOff from '../Content/imgs/camera-off.png';
import WebFont from 'webfontloader';
import { Link } from 'react-router-dom';


function layout(clientsNumber = 1) {
    const pairs = Array.from({length: clientsNumber}).reduce((acc, next, index, arr) => {
        if (index % 2 === 0) {
            acc.push(arr.slice(index, index + 2))
        }

        return acc;
    }, [])

    const rowsNumber = pairs.length;
    const height = `${65 / rowsNumber}%`
   
    return pairs.map((row, index, arr) => {
        if (index === arr.length - 1 && row.length === 1) {
            return [{
                width: '65%',
                height,
            }]
        }

        return row.map(() => ({
            width: '30%',
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
       }, []);


    const {id: roomID} = useParams();
    const {clients, provideMediaRef} = useWebRTC(roomID);
    const videoLayout = layout(clients.length);

    const videoButton = document.getElementById('off-video-button');
    const audioButton = document.getElementById('off-audio-button');

    const leaveButton = document.getElementById('room-call-leave')

    const videoLogo = document.getElementById('off-video-button');
    const audioLogo = document.getElementById('off-audio-button');
    
    if(videoButton) {
        videoButton.addEventListener('click', () => {
            const videoTrack = userStream.getVideoTracks()[0];
            if (videoTrack.enabled) {
                videoTrack.enabled = false;
                videoButton.className = 'room-button video-button-off';
                videoLogo.innerHTML = `<img src=${cameraOff} alt="Camera Off">`;
            } else {
                videoTrack.enabled = true;
                videoButton.className = 'room-button video-button-on';
                videoLogo.innerHTML = `<img src=${camera} alt="Camera On">`;
            }
        });
    }


    if(audioButton) {
        audioButton.addEventListener('click', () => {
            const audioTrack = userStream.getAudioTracks()[0];
            if (audioTrack.enabled) {
                audioTrack.enabled = false;
                audioButton.className = 'room-button video-button-off';
                audioLogo.innerHTML = `<img src=${microphoneOff} alt="Microphone Off">`
            } else {
                audioTrack.enabled = true;
                audioButton.className = 'room-button video-button-on';
                audioLogo.innerHTML = `<img src=${microphone} alt="Microphone On">`
            }
        });
    }

    if(leaveButton) {
        leaveButton.addEventListener('click', () => {
            userStream.getTracks().forEach(track => track.stop());
            setTimeout(() => {
                window.location.reload()
            }, 25);
        })
    }

    function dellOpacity() {
        let opacity1 = document.getElementById('intro-scrn');
        opacity1.className += ' dell-opacity';
        let opacity2 = document.getElementById('intro-btn');
        opacity2.className = 'join-button-opacity';
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

            {/*<div className="back-wrap"></div>

            <div className="intro-wrap">
                <div id="intro-scrn" className="intro-screen">
                    <button id="intro-btn" className="join-button" onClick={dellOpacity}>Join meeting</button>
                </div>
            </div>*/}

            <div className="header-logo">
                <img className="logo" src={logo}></img>
                <span className="logo-name">MedDoc</span>
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
                    <button className="room-button audio-button-on" id="off-audio-button">
                        <img src={microphone}></img>
                    </button>
                    <button className="room-button video-button-on" id="off-video-button">
                        <img src={camera}></img>
                    </button>
                    <button className="room-button" id="room-call-leave">
                        <Link className="room-button-text" to='/'>
                            <img src={phone}></img>
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Room;