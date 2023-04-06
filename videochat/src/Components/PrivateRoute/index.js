import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import DoctorsAccount from '../DoctorsAccount';
import ContactForm from '../ContactForm';
import { MyContext } from '../GlobalContext';


const PrivateRoute = () => {
  const [globalAuth, setGlobalAuth] = useContext(MyContext);
  const [isTokenValidated, setIsTokenValidated] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [userRole, setUserRole] = useState("");


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
          const { name, surname, profile_pic, userRole } = res.data;
          setName(name);
          setSurname(surname);
          setProfilePic(profile_pic);
          setUserRole(userRole);
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
      {userRole === 'user' && globalAuth && (
        <ContactForm />
      )}
      {userRole === 'doctor' && globalAuth && (
        <DoctorsAccount {...{ name, surname, profilePic }} />
      )}
      {!globalAuth && (
        <Navigate to="/login" replace />
      )}
    </>
  );
};

export default PrivateRoute;