import React, { useCallback, useEffect, useRef, useState } from "react";
import { socket } from "../Socket";
import ACTIONS from "../Socket/actions";
import useStateWithCallback from './useStateWithCallback';

export const LOCAL_VIDEO = 'LOCAL_VIDEO';

function useWebRTC(roomID) {
    const [clients, updateClients] = useStateWithCallback([]);

    const addNewClient = useCallback((newClient, cb) => {
        if(!clients.includes(newClient)) {
            updateClients(list => [...list, newClient], cb)
        }
    }, [clients, updateClients])

    const peerConnection = useRef({});
    const localMediaStream = useRef(null);
    const peerMediaElements = useRef({
        [LOCAL_VIDEO]: null,
    });

    useEffect(() => {
        async function startCapture() {
            localMediaStream.current = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: {
                    width: 1280,
                    height: 720,
                }
            })

            addNewClient(LOCAL_VIDEO, () => {
                const localVideoElement = peerMediaElements.current[LOCAL_VIDEO];

                if(localVideoElement) {
                    localVideoElement.volume = 0;
                    localVideoElement.srcObject = localMediaStream.current;
                }
            })
        }

        startCapture().then(() => socket.emit(ACTIONS.JOIN, {room: roomID}))
        .catch(e => console.error('Error getting userMedia:', e))
    }, [roomID])

    const provideMediaRef = useCallback((id, node) => {
        peerMediaElements.current[id] = node;
    }, [])

    return {clients, provideMediaRef};
}

export default useWebRTC;