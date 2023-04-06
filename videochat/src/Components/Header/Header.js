import React, { useEffect, useState, useContext } from "react";
import "./Header.css";
import WebFont from 'webfontloader';
import logo from '../../images/logo_white.png'
import { Link } from "react-router-dom";
import * as Scroll from 'react-scroll';
import { MyContext } from '../GlobalContext';

const Header = () => {
  const [globalAuth, setGlobalAuth] = useContext(MyContext);

  let authMarker = 'Sign in';

  let authMarkerPath = '/login';

  if(globalAuth === true) {
    authMarker = 'Profile'
    authMarkerPath = '/account'
  }
  else {
    authMarker = 'Sign in'
    authMarkerPath = '/login'
  }

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
    <header className="header">
        <div className="header-logo-wrapper">
          <Link to='/' className="header-router"><img className="header-logo" src={logo} /></Link>
          <Link to='/' className="header-router"><span className="header-logo-name">MedDoc</span></Link>
        </div>

        <div className="header-links">
          <Link to='/contact' className="header-router"><span className="header-links-text">Contact</span></Link>
          <Link to='/' onClick={ScrollToAboutUs} className="header-router"><span className="header-links-text">About us</span></Link>
          <Link to={authMarkerPath}><button className="header-sign-button">{authMarker}</button></Link>
        </div>
    </header>
    
  );
};

export default Header;
