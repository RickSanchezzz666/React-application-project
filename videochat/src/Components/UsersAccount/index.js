import './style.css';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../Header/Header'
import WebFont from 'webfontloader';
import axios from "axios";
import moment from 'moment/moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UsersAccount = ({ name, surname, profilePic }) => {
    const [appointments, setAppointments] = useState([]);

    const userAccountNotification15min = () => toast.info('Your appointment is in 15 min. Get ready soon!', {
        position: "bottom-right",
        autoClose: 15000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const userAccountNotification5min = () => toast.info('Your appointment is in 5 min. Get ready soon!', {
        position: "bottom-right",
        autoClose: 15000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const userAccountNotificationNow = () => toast.info('Your appointment is started. You can join!', {
        position: "bottom-right",
        autoClose: 15000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

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
            const res = await axios.get("/api/get-appointments", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return setAppointments(res.data);
        } catch (error) {
            return [];
        };
    };

    function userAccountNotificationShow() {
        appointments.map((appointment) => {
            let dateNow = new Date().getTime();
            let appointmentTime = moment(appointment.appointmentTime).valueOf();
            if ( appointmentTime - 900000 <= dateNow && dateNow <= appointmentTime - 865000) {
                userAccountNotification15min();
            }
            if (appointmentTime - 300000 <= dateNow && dateNow <= appointmentTime - 265000) {
                userAccountNotification5min();
            }
            if(appointment.roomId !== null && appointment.roomPass !== null) {
                userAccountNotificationNow();
            }
        })
    }

    function userAccountNotificationUpdate() {
        setTimeout(() => {
            userAccountNotificationShow()
        }, 2500)

        setTimeout(() => {
            userAccountNotificationShow()
            userAccountNotificationUpdate()
        }, 30000)
    }

    userAccountNotificationUpdate();

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
                            <ToastContainer
                                position="bottom-right"
                                autoClose={15000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="light"
                            />
                        </div>
                    </div>
                </div>
                <div className='doctor-account-component-grid-2'>
                    <div className="doctor-account-component-grid-2-section">
                        <h1 className='user-account-appointment-label'>Your future appointments:</h1>
                        <div className='user-account-appointment-list-wrapper'>
                            {appointments.length === 0 ? (<span style={{ fontStyle: 'italic' }}>There are no scheduled appointments for you yet</span>) : (appointments.map((appointment) => (
                                <div key={appointment._id} className='user-account-appointment-list-element'>
                                    <span className='user-account-appointment-list-element-label'>Appointment time: <span style={{ fontStyle: 'italic' }}>{moment(appointment.appointmentTime).calendar()}</span></span>
                                    <span className='user-account-appointment-list-element-label' style={{ fontSize: '19px' }}>Doctor: <span style={{ fontStyle: 'italic' }}>{appointment.createdBy}</span></span>
                                    {appointment.roomId !== null && appointment.roomPass !== null ? (<button onClick={() => {
                                        navigate(`/room/${appointment.roomId}`)
                                    }} className="user-account-appointment-connection-button">Connect</button>) : (
                                        <span className='user-account-appointment-list-sub-label'>You will receive an invitation link a few minutes before the meeting</span>)}
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