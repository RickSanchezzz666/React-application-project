import React, { useEffect, useRef, useContext, useState } from "react";
import { useParams } from "react-router";
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
import { MyContext } from "../GlobalContex";
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { id, password } from '../DoctorsAccount'

Modal.setAppElement(document.getElementById('room-main-page-wrapper'));

function layout(clientsNumber = 1) {
    const pairs = Array.from({ length: clientsNumber }).reduce((acc, next, index, arr) => {
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



function Room({ audioSwitch, videoSwitch }) {
    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Arvo']
            }
        });
        document.title = "Room | MedDoc";
    }, []);

    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalAppear, setModalAppear] = useState(true);
    const [doctorRoomCreate, setDoctorRoomCreate] = useContext(MyContext);

    const { id: roomID } = useParams();
    const { clients, provideMediaRef } = useWebRTC(roomID);
    const videoLayout = layout(clients.length);

    const videoButtonRef = useRef();
    const audioButtonRef = useRef();

    const leaveButtonRef = useRef();

    if (modalAppear === true) {
        if (doctorRoomCreate === true) {
            setTimeout(() => {
                setIsOpen(true)
                setModalAppear(false);
            }, 1000);
        }
    }

    function closeModal() {
        setIsOpen(false);
    }

    if (videoSwitch === false) {
        turnOffVideo();
    }
    if (audioSwitch === false) {
        turnOffAudio();
    }

    function turnOffVideo() {
        if (videoButtonRef.current) {
            const videoTrack = userStream.getVideoTracks()[0];
            if (videoTrack.enabled) {
                videoTrack.enabled = false;
                videoButtonRef.current.className = 'room-button video-button-off';
                videoButtonRef.current.innerHTML = `<img src=${cameraOff} alt="Camera Off">`;
            } else {
                videoTrack.enabled = true;
                videoButtonRef.current.className = 'room-button video-button-on';
                videoButtonRef.current.innerHTML = `<img src=${camera} alt="Camera On">`;
            }
        }
    }

    function turnOffAudio() {
        if (audioButtonRef.current) {
            const audioTrack = userStream.getAudioTracks()[0];
            if (audioTrack.enabled) {
                audioTrack.enabled = false;
                audioButtonRef.current.className = 'room-button video-button-off';
                audioButtonRef.current.innerHTML = `<img src=${microphoneOff} alt="Microphone Off">`
            } else {
                audioTrack.enabled = true;
                audioButtonRef.current.className = 'room-button video-button-on';
                audioButtonRef.current.innerHTML = `<img src=${microphone} alt="Microphone On">`
            }
        }
    }

    function callLeave() {
        if (leaveButtonRef) {
            userStream.getTracks().forEach(track => track.stop());
            setTimeout(() => {
                window.location.reload()
            }, 0);
        }
    }

    console.log(clients);

    return (

        <div id="room-main-page-wrapper" className="room-wrapper" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            height: '100vh',
            width: '100vw',
        }}>

            <Modal
                className={"room-modal-window-wrapper"}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Room ID and Password"
            >
                <h2>Room ID and Password</h2>
                <div className="room-modal-window-info">Room ID is: <span className="room-modal-window-info-text">{id}</span><br>
                </br>Room password is: <span className="room-modal-window-info-text">{password}</span></div>
                <button className="room-modal-window-button" onClick={closeModal}>Close</button>
            </Modal>

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
                    <button ref={audioButtonRef} onClick={turnOffAudio} className="room-button audio-button-on" id="off-audio-button">
                        <img src={microphone}></img>
                    </button>
                    <button ref={videoButtonRef} onClick={turnOffVideo} className="room-button video-button-on" id="off-video-button">
                        <img src={camera}></img>
                    </button>
                    <Link className="room-button-text" to='/'>
                        <button onClick={callLeave} ref={leaveButtonRef} className="room-button" id="room-call-leave">
                            <img src={phone}></img>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Room;