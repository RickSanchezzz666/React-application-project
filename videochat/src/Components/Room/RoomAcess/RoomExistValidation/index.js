import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { MyContext } from '../../../GlobalContex';

const RoomExistVerify = ({ children }) => {
  const [verify, setVerify] = useState(false);
  const [isIdValidated, setIsIdValidated] = useState(false);
  const [doctorRoomCreate, setDoctorRoomCreate] = useContext(MyContext);
  const [adminRoomCreate, setAdminRoomCreate] = useContext(MyContext);

  useEffect(() => {
    let pathName = window.location.pathname;
    let roomId = pathName.slice(6, 42);
    if (roomId) {
      axios.get('/api/room-verify', {
        params: {
          roomId: roomId,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            setVerify(true);
          }
        })
        .catch((err) => {
          setVerify(false);
        })
        .then(() => setIsIdValidated(true));
    } else {
      setIsIdValidated(true);
    }

  }, [])

  if (!isIdValidated) return <div />;

  return (doctorRoomCreate || adminRoomCreate) ? (
    children
  ) : verify ? (
    children
  ) : (
    <Navigate to="/room-not-found" replace />
  );
};

export default RoomExistVerify;