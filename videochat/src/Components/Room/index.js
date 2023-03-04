import React from "react";
import { useParams } from "react-router";
import useWebRTC, { LOCAL_VIDEO, userStream } from "../../hooks/useWebRTC";
import './style.css';


function layout(clientsNumber = 1) {
    const pairs = Array.from({length: clientsNumber}).reduce((acc, next, index, arr) => {
        if (index % 2 === 0) {
            acc.push(arr.slice(index, index + 2))
        }

        return acc;
    }, [])

    const rowsNumber = pairs.length;
    const height = `${100 / rowsNumber}%`

    return pairs.map((row, index, arr) => {
        if (index === arr.length - 1 && row.length === 1) {
            return [{
                width: '100%',
                height,
            }]
        }

        return row.map(() => ({
            width: '50%',
            height
        }))
    }).flat()
}



function Room () {
    const {id: roomID} = useParams();
    const {clients, provideMediaRef} = useWebRTC(roomID);
    const videoLayout = layout(clients.length);

    const videoButton = document.getElementById('off-video-button');
    
    function hideCam() {
        const videoTrack = userStream.getTracks().find(track => track.kind === 'video');
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
        }}>

            <div className="back-wrap"></div>

            <div className="intro-wrap">
                <div id="intro-scrn" className="intro-screen">
                    <button id="intro-btn" className="join-button" onClick={dellOpacity}>Join meeting</button>
                    <button id="off-video-button">Hide cam</button>
                </div>
            </div>

            {clients.map((clientID, index) => {
                return (
                    <div key={clientID} style={videoLayout[index]}>
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
        </div>
    )
}

export default Room;