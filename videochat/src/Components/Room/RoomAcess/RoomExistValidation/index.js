import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Room from '../../index';

const RoomExistVerify = ({ children }) => {
  const [verify, setVerify] = useState(false);
  const [isIdValidated, setIsIdValidated] = useState(false);
  const [accessLevel, setaccessLevel] = useState("");

  useEffect(async () => {
    let token = localStorage.getItem("token");
    if (token) {
      await axios
        .get("/api/gatekeeper", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            const { access_level } = res.data;
            setaccessLevel(access_level);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Something went wrong!");
    }

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

  return (accessLevel === 25 || accessLevel === 30) ? (
    <Room accessLevel={accessLevel} />
  ) : verify ? (
    children
  ) : (
    <Navigate to="/room-not-found" replace />
  );
};

export default RoomExistVerify;