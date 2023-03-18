import React, { useState } from 'react';
import axios from 'axios';

const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/login?username=${username}&password=${password}`);
      const { token } = response.data;
      localStorage.setItem('token', token);
      return alert(`Your token was successfully saved.\nToken: ${token}`);
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
    </form>
  );
};

export default SignInPage;