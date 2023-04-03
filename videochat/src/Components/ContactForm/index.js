import React, { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';
import Header from '../Header/Header'

function ContactForm() {

  useEffect(() => {
    document.title = "Contact | MedDoc";
   }, []);
  
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  const [complains, setComplains] = useState('');

  const handleCreate = () => {
    const data = {
      contact_information: {
        name,
        surname,
        email,
        phone,
      },
      location: {
      },
      patient_info: {
        birthday,
        overall: complains,
      },
    };

    axios.post('/api/contact-form', data)
      .then(response => {
        console.log(response.data);
        return alert(response.data);
      })
      .catch(error => {
        console.error(error);
        return alert(error);
      });
  };

  return (
    <div className="contact-page">
      <Header />
         <div className="contact-page-background">

        <div className="application-form-wrapper">
          <div className="application-form">
          <div className="application-form-header">Application form</div>
          <div className="application-form-name">
            <label className="contact-text-input" htmlFor="name">Name</label>
            <input type="text" id="name" className="contact-page-input" value={name} onChange={(event) => setName(event.target.value)} />
          </div>
          <div className="application-form-email">
          <label className="contact-text-input" htmlFor="email">Email</label>
            <input type="text" id="email" className="contact-page-input" value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div className="application-form-birthday">
          <label className="contact-text-input" htmlFor="birthday">Birthday</label>
            <input type="date" id="birthday" className="contact-page-input" value={birthday} onChange={(event) => setBirthday(event.target.value)} />
          </div>
          <div className="application-form-lastname">
          <label className="contact-text-input" htmlFor="LastName">Last Name</label>
            <input type="text" id="LastName" className="contact-page-input" value={surname} onChange={(event) => setSurname(event.target.value)} />
          </div>
          <div className="application-form-number">
          <label className="contact-text-input" htmlFor="Number">Phone Number</label>
            <input type="text" id="Number" className="contact-page-input" value={phone} onChange={(event) => setPhone(event.target.value)} />
          </div>
          <div className="application-form-complains">
            <div><label className="contact-text-input-complains" htmlFor="complains">Complains</label></div>
            <div><textarea className="contact-page-input-complains" id="complains" value={complains} onChange={(event) => setComplains(event.target.value)}></textarea></div>
          </div>
          <div className="application-form-create">
              <input className="application-form-create-button" type="button" value="Create" onClick={handleCreate} />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;