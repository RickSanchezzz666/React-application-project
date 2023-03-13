import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const url = `/login?username=${username}&password=${password}`;

    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="contact-page">
      <Header />
        <div className="contact-page-background">

        <div className="application-form-wrapper">
          <div className="application-form">
          <div className="application-form-header">Application form</div>
          <div className="application-form-name">
            <label className="contact-text-input" for="name">Name</label>
            <input type="text" id="name" className="contact-page-input" />
          </div>
          <div className="application-form-email">
          <label className="contact-text-input" for="email">Email</label>
            <input type="text" id="email" className="contact-page-input" />
          </div>
          <div className="application-form-birthday">
          <label className="contact-text-input" for="birthday">Birthday</label>
            <input type="text" id="birthday" className="contact-page-input" />
          </div>
          <div className="application-form-lastname">
          <label className="contact-text-input" for="LastName">LastName</label>
            <input type="text" id="LastName" className="contact-page-input" />
          </div>
          <div className="application-form-complains">
            <div><label className="contact-text-input-complains" for="complains">Complains</label></div>
            <div><textarea className="contact-page-input-complains" id="complains" ></textarea></div>
          </div>
          <div className="application-form-create">
              <input className="application-form-create-button" type="button" value="Create" />
          </div>
        </div>
         
        </div>
      </div>
      <Footer />
    </div>

    /*<div>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={fetchData}>Submit</button>
      {data && <div>{JSON.stringify(data)}</div>}
    </div>*/
  );
}

export default App;