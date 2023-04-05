import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import DoctorsAccount from '../DoctorsAccount';
import ContactForm from '../ContactForm';
export { authExport };

const PrivateRoute = () => {
  const [auth, setAuth] = useState(false);
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

  if (userRole === "user") return auth ? (
    React.cloneElement(<ContactForm/>, { name, surname, profilePic })
  ) : (
    <Navigate to="/login" replace />
  );

  if (userRole === "doctor") return auth ? (
    React.cloneElement(<DoctorsAccount/>, { name, surname, profilePic })
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;