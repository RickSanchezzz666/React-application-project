import React, { useEffect, useRef, useState, useCallback } from "react";
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
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { roomId, roomPass } from '../DoctorsAccount'
import { adminId, adminPassword } from '../AdminsAccount'

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



function Room({ audioSwitch, videoSwitch, accessLevel }) {
    const [audioInputDevices, setAudioInputDevices] = useState([]);
    const [videoDevices, setVideoDevices] = useState([]);

    const [selectedAudioInputDevices, setSelectedAudioInputDevices] = useState([]);
    const [selectedVideoDevices, setSelectedVideoDevices] = useState([]);

    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Arvo']
            }
        });
        document.title = "Room | MedDoc";

        navigator.mediaDevices
            .enumerateDevices()
            .then((devices) => {
                setAudioInputDevices(devices.filter(device => device.kind === 'audioinput'));
                setVideoDevices(devices.filter(device => device.kind === 'videoinput'));
            })
            .catch((err) => {
                console.error(`${err.name}: ${err.message}`);
            })
    }, []);


    let showRoomId;
    let showPassword;

    if (roomId === '') {
        showRoomId = adminId;
    } else {
        showRoomId = roomId;
    }

    if (roomPass === '') {
        showPassword = adminPassword;
    } else {
        showPassword = roomPass;
    }

    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalAppear, setModalAppear] = useState(true);
    const [settingsIsOpen, setSettingsIsOpen] = useState(false);

    const { id: roomID } = useParams();
    const { clients, provideMediaRef, updateStartCapture } = useWebRTC(roomID);
    const videoLayout = layout(clients.length);

    const videoButtonRef = useRef();
    const audioButtonRef = useRef();

    const leaveButtonRef = useRef()

    if (modalAppear === true) {
        if (accessLevel === 25 || accessLevel === 30) {
            setTimeout(() => {
                setIsOpen(true)
                setModalAppear(false);
            }, 1000);
        }
    }

    const handleAudioInputDeviceChange = useCallback(async (event) => {
        const deviceId = event.target.value;
        setSelectedAudioInputDevices(deviceId);

        const constraints = {
            audio: {
                deviceId: { exact: deviceId }
            },
            video: true
        };

        const tracks = userStream.getAudioTracks();
        for (const track of tracks) {
            await track.stop();
            userStream.removeTrack(track);
        }

        await updateStartCapture(constraints);

        if (videoButtonRef.current.className === 'room-button video-button-off') {
            const videoTrack = userStream.getVideoTracks()[0];
            videoTrack.enabled = false;
        }

        if (audioButtonRef.current.className === 'room-button audio-button-off') {
            const audioTrack = userStream.getAudioTracks()[0];
            audioTrack.enabled = false;
        }

    }, []);

    const handleVideoDeviceChange = useCallback(async (event) => {
        const deviceId = event.target.value;
        setSelectedVideoDevices(deviceId);

        const constraints = {
            audio: true,
            video: {
                deviceId: { exact: deviceId }
            }
        };

        const tracks = userStream.getVideoTracks();
        for (const track of tracks) {
            await track.stop();
            userStream.removeTrack(track);
        }

        await updateStartCapture(constraints);

        if (videoButtonRef.current.className === 'room-button video-button-off') {
            const videoTrack = userStream.getVideoTracks()[0];
            videoTrack.enabled = false;
        }

        if (audioButtonRef.current.className === 'room-button audio-button-off') {
            const audioTrack = userStream.getAudioTracks()[0];
            audioTrack.enabled = false;
        }

    }, []);

    function openSettingsModal() {
        setSettingsIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
        setSettingsIsOpen(false);
    }

    if (videoSwitch === false) {
        setTimeout(() => {
            const videoTrack = userStream.getVideoTracks()[0];
            videoTrack.enabled = false;
            videoButtonRef.current.className = 'room-button video-button-off';
            videoButtonRef.current.innerHTML = `<img src=${cameraOff} alt="Camera Off">`;
        }, 250);
    }
    if (audioSwitch === false) {
        setTimeout(() => {
            const audioTrack = userStream.getAudioTracks()[0];
            audioTrack.enabled = false;
            audioButtonRef.current.className = 'room-button audio-button-off';
            audioButtonRef.current.innerHTML = `<img src=${microphoneOff} alt="Microphone Off">`
        }, 250);
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
                audioButtonRef.current.className = 'room-button audio-button-off';
                audioButtonRef.current.innerHTML = `<img src=${microphoneOff} alt="Microphone Off">`
            } else {
                audioTrack.enabled = true;
                audioButtonRef.current.className = 'room-button audio-button-on';
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
                <div className="room-modal-window-info">Room ID is: <span className="room-modal-window-info-text">{showRoomId}</span><br>
                </br>Room password is: <span className="room-modal-window-info-text">{showPassword}</span></div>
                <button className="room-modal-window-button" onClick={closeModal}>Close</button>
            </Modal>

            <Modal
                className={"room-modal-settings-window-wrapper"}
                isOpen={settingsIsOpen}
                onRequestClose={closeModal}
                contentLabel="Settings"
            >
                <h2>Settings</h2>
                <div className="room-settings-modal-wrapper">
                    <span>Choose your Microphone:</span>
                    <select className="room-settings-modal-input" value={selectedAudioInputDevices} onChange={handleAudioInputDeviceChange}>
                        {audioInputDevices.map((device) => (
                            <option key={device.deviceId} value={device.deviceId} selected={device.deviceId === selectedAudioInputDevices}>
                                {device.label}
                            </option>
                        ))}
                    </select>
                    <span>Choose your Webcam:</span>
                    <select className="room-settings-modal-input" value={selectedVideoDevices} onChange={handleVideoDeviceChange}>
                        {videoDevices.map((device) => (
                            <option key={device.deviceId} value={device.deviceId} selected={device.deviceId === selectedVideoDevices}>
                                {device.label}
                            </option>
                        ))}
                    </select>
                </div>
                <button className="room-modal-window-button" onClick={closeModal}>Close</button>
            </Modal>


            <div className="header-logo-room">
                <Link to='/' className="header-router" onClick={callLeave}><img className="room-logo" src={logo} /></Link>
                <Link to='/' className="header-router" onClick={callLeave}><span className="room-logo-name">MedDoc</span></Link>
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
                    <button onClick={openSettingsModal} className="room-button" id="room-settings">
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