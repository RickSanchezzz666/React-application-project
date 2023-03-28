import React from "react";
import './style.css'
import camera from '../Room/imgs/camera.png';
import cameraOff from '../Room/imgs/camera-off.png';
import microphone from '../Room/imgs/microphone.png';
import microphoneOff from '../Room/imgs/microphone-off.png';
import { useEffect } from "react";
import { createElement } from "react";

function Redirect() {

    const videoButton = document.getElementById('redirect-off-video-button');
    const audioButton = document.getElementById('redirect-off-audio-button');
    
    let videoSwitch = true;
    let audioSwitch = true;

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

    console.log(videoSwitch)

    return(
        <div className="redirect-component">
            <div className="redirect-button-wrapper">
                    <button onClick={redirectTurnOffAudio} className="room-button audio-button-on" id="redirect-off-audio-button">
                        <img src={microphone}></img>
                    </button>
                    <button onClick={redirectTurnOffVideo} className="room-button video-button-on" id="redirect-off-video-button">
                        <img src={camera}></img>
                    </button>
            </div>
        </div>
    )
}

export default Redirect;