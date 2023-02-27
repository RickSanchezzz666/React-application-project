import React from "react";
import './style.css'
import { useParams } from "react-router";
import useWebRTC, { LOCAL_VIDEO } from "../../hooks/useWebRTC";
import './style.css';

function layout(clientsNumber = 1) {
    const pairs = Array.from({length: clientsNumber}).reduce((acc, index, arr) => {
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

    console.log(clients);

    return (
        <div className="room-container">
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