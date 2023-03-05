import React, { useEffect } from "react";
import { useParams } from "react-router";
import useWebRTC, { LOCAL_VIDEO, userStream } from "../../hooks/useWebRTC";
import './style.css';
import logo from '../Content/imgs/logo_blue.png';
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
                videoButton.innerHTML = 'Show cam'
            } else {
                videoTrack.enabled = true;
                videoButton.innerHTML = "Hide cam"
            }
        });
    }

    if(audioButton) {
        audioButton.addEventListener('click', () => {
            const audioTrack = userStream.getTracks().find(track => track.kind === 'audio');
            if (audioTrack.enabled) {
                audioTrack.enabled = false;
                audioButton.innerHTML = 'Mute mic'
            } else {
                audioTrack.enabled = true;
                audioButton.innerHTML = "Unmute mic"
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
                <button id="off-audio-button">Mute mic</button>
                <button id="off-video-button">Hide cam</button>
            </div>
        </div>
    )
}

export default Room;