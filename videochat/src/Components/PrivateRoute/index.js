import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import DoctorsAccount from '../DoctorsAccount';
import AdminsAccount from '../AdminsAccount';
import UsersAccount from '../UsersAccount';

const PrivateRoute = () => {
  const [auth, setAuth] = useState(false);
  const [isTokenValidated, setIsTokenValidated] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [accessLevel, setaccessLevel] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      axios.get('/api/gatekeeper', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          const { name, surname, profile_pic, access_level } = res.data;
          setName(name);
          setSurname(surname);
          setProfilePic(profile_pic);
          setaccessLevel(access_level);
          setAuth(true);
        }
      })
      .catch((err) => {
        setAuth(false);
      })
      .then(() => setIsTokenValidated(true));
    } else {
       setIsTokenValidated(true);
    }
  }, [])

  if (!isTokenValidated) return <div />;

  return (
    <>
      {accessLevel === 20 && auth && (
        <UsersAccount {...{ name, surname, profilePic }} />
      )}
      {accessLevel === 25 && auth && (
        <DoctorsAccount {...{ name, surname, profilePic }} />
      )}
      {accessLevel === 30 && auth && (
        <AdminsAccount {...{ name, surname, profilePic }} />
      )}
      {!auth && (
        <Navigate to="/login" replace />
      )}
    </>
  );
};

export default PrivateRoute;