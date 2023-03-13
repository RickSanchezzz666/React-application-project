import React, { useEffect } from "react";
import "./Footer.css";
import centralLogo from '../../images/Unicore white logo.png';
import viber from '../../images/viber.png';
import facebook from '../../images/facebook.png';
import telegram from '../../images/telegram.png';
import instagram from '../../images/instagram.png';
import WebFont from 'webfontloader';

const Footer = () => { 
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Arvo']
      }
    });
   }, []);

  return (
    <footer className="footer">
      <div className="footer-wrapper">
      <div className="footer-contact">
        <div className="footer-contact-contact-word">Contact:</div>
        <div className="footer-contact-phone-1">+380 (97) 010 6092</div>
        <div className="footer-contact-phone-2">+380 (97) 077 0442</div>
        <div className="footer-contact-email">meddoc@gmail.com</div>
      </div>

      <div className="footer-company-logo-wrapper">
        <img className="footer-company-logo" src={centralLogo}></img>
      </div>

      <div className="footer-messengers-wrapper">
        <div className="footer-messengers-circle"><img className="footer-messenger-logo" src={viber} alt="" /> </div>
        <div className="footer-messengers-circle"><img className="footer-messenger-logo" src={facebook} alt="" /></div>
        <div className="footer-messengers-circle"><img className="footer-messenger-logo" src={telegram} alt="" /></div>
        <div className="footer-messengers-circle"><img className="footer-messenger-logo" src={instagram} alt="" /></div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
