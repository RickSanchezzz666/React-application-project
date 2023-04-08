import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import DoctorsAccount from '../DoctorsAccount';
import AdminsAccount from '../AdminsAccount';
import { MyContext } from '../GlobalContex';


const PrivateRoute = () => {
  const [globalAuth, setGlobalAuth] = useContext(MyContext);
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
          setGlobalAuth(true);
        }
      })
      .catch((err) => {
        setGlobalAuth(false);
      })
      .then(() => setIsTokenValidated(true));
    } else {
       setIsTokenValidated(true);
    }
  }, [])

  if (!isTokenValidated) return <div />;

  return (
    <>
      {accessLevel === 20 && globalAuth && (
        <DoctorsAccount {...{ name, surname, profilePic }} />
      )}
      {accessLevel === 25 && globalAuth && (
        <DoctorsAccount {...{ name, surname, profilePic }} />
      )}
      {accessLevel === 30 && globalAuth && (
        <AdminsAccount {...{ name, surname, profilePic }} />
      )}
      {!globalAuth && (
        <Navigate to="/login" replace />
      )}
    </>
  );
};

export default PrivateRoute;