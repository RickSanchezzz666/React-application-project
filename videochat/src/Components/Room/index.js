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

    const videoLogo = document.getElementById('off-video-button');
    const audioLogo = document.getElementById('off-audio-button');
    
    function hideCam() {
        const videoTrack = userStream.getTracks().find(track => track.kind === 'video');
    }

    function muteMic() {
        const audioTrack = userStream.getTracks().find(track => track.kind === 'audio');
    }


    if(videoButton) {
        videoButton.addEventListener('click', () => {
            const videoTrack = userStream.getTracks().find(track => track.kind === 'video');
            if (videoTrack.enabled) {
                videoTrack.enabled = false;
                videoButton.className = 'room-button video-button-off';
                videoLogo.innerHTML = '<img src="/static/media/camera-off.964b9b1cba873749ea0a.png">'
            } else {
                videoTrack.enabled = true;
                videoButton.className = 'room-button video-button-on';
                videoLogo.innerHTML = '<img src="/static/media/camera.e4b171aa2da395b00e68.png">'
            }
        });
    }


    if(audioButton) {
        audioButton.addEventListener('click', () => {
            const audioTrack = userStream.getTracks().find(track => track.kind === 'audio');
            if (audioTrack.enabled) {
                audioTrack.enabled = false;
                audioButton.className = 'room-button video-button-off';
                audioLogo.innerHTML = '<img src="/static/media/microphone-off.d119a010849be20d09f2.png">'
            } else {
                audioTrack.enabled = true;
                audioButton.className = 'room-button video-button-on';
                audioLogo.innerHTML = '<img src="/static/media/microphone.effb021cb32309301520.png">'
            }
        });
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
                        <img src={phone}></img>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Room;