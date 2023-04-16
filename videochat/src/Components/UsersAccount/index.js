import './style.css';
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../Header/Header'
import WebFont from 'webfontloader';

const UsersAccount = ({ name, surname, profilePic }) => {

    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Arvo']
            }
        });
        document.title = "Dashboard | MedDoc";
    }, []);

    const navigate = useNavigate();

    const setLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
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

                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersAccount;