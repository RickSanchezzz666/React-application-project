import React, { useEffect, useState } from "react";
import "./Header.css";
import WebFont from 'webfontloader';
import logo from '../../images/logo_white.png'
import { Link } from "react-router-dom";
import * as Scroll from 'react-scroll';
import {auth} from '../PrivateRoute';

const Header = () => {
  const [authMarker, setAuthMarker] = useState(false);
  const [authLink, setAuthLink] = useState('');

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Arvo']
      }
    });
   }, []);

   if (auth === true) {
    setAuthMarker("Account");
    setAuthLink('/account');
   } else {
    setAuthMarker("Sign In");
    setAuthLink('/login');
   };

   let scroll = Scroll.animateScroll;

   function ScrollToAboutUs() {
    scroll.scrollTo(1588);
   }

  return (
    <header className="header">
        <div className="header-logo-wrapper">
          <Link to='/' className="header-router"><img className="header-logo" src={logo} /></Link>
          <Link to='/' className="header-router"><span className="header-logo-name">MedDoc</span></Link>
        </div>

        <div className="header-links">
          <Link to='/contact' className="header-router"><span className="header-links-text">Contact</span></Link>
          <Link to='/' onClick={ScrollToAboutUs} className="header-router"><span className="header-links-text">About us</span></Link>
          <Link to={authLink}><button className="header-sign-button">{authMarker}</button></Link>
        </div>
    </header>
    
  );
};

export default Header;
