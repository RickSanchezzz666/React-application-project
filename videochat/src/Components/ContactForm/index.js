import React, { useState } from 'react';
import './style.css';
import axios from 'axios';

const ContactForm = () => {
    const [formData, setFormData] = useState({
      username: '',
      password: ''
    });
  
    const handleChange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        await axios.get('http://localhost:3001/login', formData);
        alert('Форма успішно надіслана');
      } catch (error) {
        console.error(error);
        alert('Виникла помилка');
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  };
  
  export default ContactForm;