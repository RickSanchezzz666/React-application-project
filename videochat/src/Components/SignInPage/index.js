import './style.css';
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from 'axios';
import Header from '../SignInHeader/Header';
import { MyContext } from '../GlobalContext';

const SignInPage = () => {
  const [globalAuth, setGlobalAuth] = useContext(MyContext);
  const [authVerify, setAuthVerify] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sign In | MedDoc";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { username, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/account');
    } catch (error) {
      console.error(error);
      return alert('Something went wrong.');
    }
  };

if(globalAuth === false) {
  setAuthVerify(false)
}
else {
  setAuthVerify(true)
}

 <Navigate to="/room-not-found" replace />

  

  return (
     <div className="sign-in-container">
      <Header />
      <div className="sign-in-form-wrapper">
         <form className="sign-in-form" onSubmit={handleSubmit}>
             <label className="sing-in-login-label">Login</label>
             <input className="sign-in-login" id="loginSign" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
 
             <label className="sing-in-login-label">Password</label>
             <input className="sing-in-password" id="passwordSign" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
             <div className="sing-in-login-button-wrapper">
              <button className="sing-in-login-button" type="submit">Sign In</button>
             </div>
             <Link to='/account'><button type="submit">Manual Redirect</button></Link>
         </form>
     </div>
   </div>
  );
};

export default SignInPage;
