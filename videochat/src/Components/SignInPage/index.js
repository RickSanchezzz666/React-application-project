import './style.css';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Header from '../SignInHeader/Header';

const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { username, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      alert(`Your token was successfully saved.\nToken: ${token}\n\nYou will be redirected`);
      navigate('/doctor/cabinet');
    } catch (error) {
      console.error(error);
      return alert('Something went wrong.');
    }
  };

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
             <Link to='/doctor/cabinet'><button type="submit">Manual Redirect</button></Link>
         </form>
     </div>
   </div>
  );
};

export default SignInPage;
