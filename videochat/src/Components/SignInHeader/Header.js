import React, { useEffect } from "react";
import "./Header.css";
import WebFont from 'webfontloader';
import logo from '../../images/logo_white.png'
import { Link } from "react-router-dom";
import * as Scroll from 'react-scroll';

const Header = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Arvo']
      }
    });
   }, []);

   let scroll = Scroll.animateScroll;

   function ScrollToAboutUs() {
    scroll.scrollTo(1588);
   }

  return (

    <header className="sign-in-header">
        <div className="sign-in-header-logo-wrapper">
          <Link to='/' className="header-router"><img className="header-logo" src={logo} /></Link>
          <Link to='/' className="header-router"><span className="header-logo-name">MedDoc</span></Link>
        </div>

        <div className="sign-in-header-links">
          <Link to='/contact' className="header-router"><span className="header-links-text">Contact</span></Link>
          <Link to='/' onClick={ScrollToAboutUs} className="header-router"><span className="header-links-text">About us</span></Link>
          <Link to='/login'><button className="header-sign-button">Sign in</button></Link>
        </div>
    </header>
    
  );
};

export default Header;
