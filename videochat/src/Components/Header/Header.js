import React, { useEffect } from "react";
import "./Header.css";
import WebFont from 'webfontloader';
import logo from '../../images/logo_white.png'
import { Link } from "react-router-dom";

const Header = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Arvo']
      }
    });
   }, []);

  return (

    <header className="header">
      <div className="header-wrapper">
        <div className="header-logo-wrapper">
          <Link to='/' className="header-router"><img className="header-logo" src={logo} /></Link>
          <Link to='/' className="header-router"><span className="header-logo-name">MedDoc</span></Link>
        </div>

        <div className="header-links">
          <span className="header-links-text">Contact</span>
          <span className="header-links-text">About us</span>
          <span className="header-links-text">English</span>
          <button className="header-sign-button">
            <span className="header-links-text">Sign in</span>
          </button>
        </div>
      </div>
    </header>
    
  );
};

export default Header;
