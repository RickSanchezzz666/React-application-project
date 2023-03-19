import './style.css';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { username, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      alert(`Your token was successfully saved.\nToken: ${token}\n\nYou will be redirected`);
      window.location.href = '/doctor/cabinet';
    } catch (error) {
      console.error(error);
      return alert('Something went wrong.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </label>
      <br/>
      <button type="submit">Login</button>
      <br/><br/>
      <Link to='/doctor/cabinet'><button type="submit">Manual Redirect</button></Link>
    </form>
  );
};

export default SignInPage;