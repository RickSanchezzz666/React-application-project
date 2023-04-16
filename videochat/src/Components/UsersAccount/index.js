import './style.css';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../Header/Header'
import WebFont from 'webfontloader';
import axios from "axios";
import moment from 'moment/moment';

const UsersAccount = ({ name, surname, profilePic }) => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Arvo']
            }
        });
        document.title = "Dashboard | MedDoc";
        getAppointments();
    }, []);

    const navigate = useNavigate();

    const setLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    async function getAppointments() {
        const token = localStorage.getItem("token");
        try {
            const res = await axios.get("/api/show-user-appointments", {
              headers: {
                Authorization: `Bearer ${token}`,
              }
            });
            return setAppointments(res.data);
          } catch (error) {
            return [];
          };
    };

    return (
        <div className='doctor-component-wrapper'>
            <Header />
            <div className="doctor-account-component-wrapper">
                <div className='doctor-account-component-grid-1'>
                    <div className='doctor-account-component-grid-1-avatar'>
                        <div className="doctor-account-component-grid-1-space">
                            <img className="doctor-account-component-grid-1-icon" src={profilePic}></img>
                        </div>
                    </div>
                    <div className='doctor-account-component-grid-text'>
                        <span className="doctor-account-component-grid-profile-text">{name}</span>
                        <span className="doctor-account-component-grid-profile-text doctor-account-component-grid-profile-text-2">{surname}</span>
                        <div className="doctor-account-component-grid-log-out">
                            <button className='doctor-account-component-grid-log-out-button' onClick={setLogout}>Log out</button>
                        </div>
                    </div>
                </div>
                <div className='doctor-account-component-grid-2'>
                    <div className="doctor-account-component-grid-2-section">
                        <h1 className='user-account-appointment-label'>Your future appointments:</h1>
                        <div className='user-account-appointment-list-wrapper'>
                            {appointments.length === 0 ? (<span style={{ fontStyle: 'italic' }}>There are no scheduled appointments for you yet</span>) : ( appointments.map((appointment) => (
                                <div key={appointment._id} className='user-account-appointment-list-element'>
                                    <span className='user-account-appointment-list-element-label'>Appointment time: <span style={{ fontStyle: 'italic' }}>{moment(appointment.appointmentTime).calendar()}</span></span>
                                    <span className='user-account-appointment-list-element-label' style={{ fontSize: '19px' }}>Doctor: <span style={{ fontStyle: 'italic' }}>{appointment.createdBy}</span></span>
                                    <span className='user-account-appointment-list-sub-label'>You will receive an invitation link to your email a few minutes before the meeting</span>
                                </div>
                            )))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersAccount;