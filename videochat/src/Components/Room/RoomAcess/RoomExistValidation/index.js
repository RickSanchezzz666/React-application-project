import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const RoomExistVerify = ({ children }) => {
  const [verify, setVerify] = useState(false);
  const [isIdValidated, setIsIdValidated] = useState(false);

  useEffect(() => {
    let pathName = window.location.pathname;
    let roomId = pathName.slice(13, 42);
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

  return verify ? (
    children
  ) : (
    <Navigate to="/page-not-found" replace />
  );
};

export default RoomExistVerify;