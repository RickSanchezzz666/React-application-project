import React, { useEffect, useRef, useState } from "react";
import './style.css';
import {socket} from "../../Socket";
import ACTIONS from "../../Socket/actions";
import { useNavigate } from "react-router-dom";
import {v4} from 'uuid';
import Header from '../Header/Header'
import doctorMainImage from '../../images/people_phone.png';
import doctorImage1 from '../../images/vuyko_left.png';
import doctorImage2 from '../../images/vuyko_centr.png';
import doctorImage3 from '../../images/vuyko_right.png';
import doctorImage4 from '../../images/vuyko_at_the_end.png';
import centralLogo from '../../images/Unicore white logo.png';
import viber from '../../images/viber.png';
import facebook from '../../images/facebook.png';
import telegram from '../../images/telegram.png';
import instagram from '../../images/instagram.png';
import WebFont from 'webfontloader';

function Content () {
    const history = useNavigate();
    const [rooms, updateRooms] = useState([]);
    const rootNode = useRef();

    useEffect(() => {
        socket.on(ACTIONS.SHARE_ROOMS, ({rooms = []} = {}) => {
            if (rootNode.current) {
                updateRooms(rooms);
            }
        })
    }, [])

    useEffect(() => {
      WebFont.load({
        google: {
          families: ['Bree Serif']
        }
      });
     }, []);

    return (
    <div className="about-us-component">
     <Header />
      <div className="about-us-container-1">
        <div className="container-1-grid">
          <div className="grid-1-wrapper">
            <div className="container-1-text-1">CONSULTATION OF THE PATIENT</div>
            <div className="container-1-text-2">
              DOCTORS, MEDICINES, TESTS - ALL IN ONE SERVICE
            </div>
          </div>
          <div className="container-1-input">
            <input type="text" className="meeting-input" />
            <input type="button" value="Join meeting" className="meeting-join-button" />  
          </div>
        </div>
        <div className="container-1-doctor-img">
          <img src={doctorMainImage} alt="" className="doctor-image" />
        </div>
      </div>

      <div className="about-us-container-2">
        <div className="container-2-wrapper">
          <div className="container-2-cont-1">
            <div className="container-2-text-1">
              <p className="container-2-text-2">Consultation of a family doctor</p>
              <p className="container-2-text-2">Get medical help online</p>
              <p className="container-2-text-2">Doctor's consultation in one click (video/audio/chat)</p>
            </div>
              <div className="doctor-image-1"><img src={doctorImage1} alt="" className="container-2-image-1"/></div>
            </div>
            <div className="container-2-cont-2">
              <div className="container-2-text-1">
                <p className="container-2-text-3">Ordering medicines online</p>
                <p className="container-2-text-3">Search and reservation of drugs with a discount</p>
              </div>
              <div className="doctor-image-1">
                <img src={doctorImage2} alt="" className="container-2-image-2"/>
              </div>
            </div>
            <div className="container-2-cont-3">
              <div className="container-2-text-1">
                <p className="container-2-text-2">Consultation of a pediatrician online</p>
                <p className="container-2-text-2">Get medical help online<br></br>Doctor's consultation in one click (video/audio/chat)</p>
              </div>
              <div className="doctor-image-1">
                <img src={doctorImage3} alt="" className="container-2-image-3"/>
              </div>
            </div>
        </div>
      </div>

    <div className="about-us-container-3">
      <div className="container-3-wrapper">
          <div className="container-3-large-line"></div>
          <div className="container-3-tall-line"></div>
        <div className="container-3-grid">
          <div className="container-3-cont-1">
            <div className="container-3-num-1">+1.5m</div>
            <div className="container-3-down-text-1">USERS</div>
          </div>
          <div className="container-3-cont-2">
            <div className="container-3-num-2">+600</div>
            <div className="container-3-down-text-2">DOCTORS</div>
          </div>
          <div className="container-3-cont-3">
            <div className="container-3-num-3">+5000</div>
            <div className="container-3-down-text-3">POSITIVE REVIEWS</div>
          </div>
        </div>
      </div>
    </div>

    <div className="about-us-container-4">
      <div className="container-4-wrapper">
        <div className="container-4-div-1"><span className="container-4-text-1">About us</span></div>
        <div className="container-4-grid">
          <div className="container-4-div-2">
            <li className="container-4-text-2">One of the largest telemedicine systems in Ukraine;</li>
            <li className="container-4-text-2">Your services will become avaible to 1 million users;</li>
            <li className="container-4-text-2">More than 10,000 patients are served every month;</li>
            <li className="container-4-text-2">A unique online system with a neural connection that helps in maintenance;</li>
          </div>
          <div className="container-4-div-3">
            <img src={doctorImage4} alt="" className="container-4-image"/>
          </div>
        </div>
      </div>
    </div>

    <div className="footer-wrapper">
    <footer className="footer">
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
    </footer>
    </div>

    </div>
    )
}

export default Content;


/*<div className="phoneCall">
          <img src="/images/call.png" alt="" className="call" />
          <div className="cyrcleAboutUs1"></div>
          <div className="cyrcleAboutUs2"></div>
        </div>  */

/*<div ref={rootNode}>
            <h1>Available Rooms</h1>
            <ul>
                {rooms.map(roomID => (
                    <li key={roomID}>
                        {roomID}
                        <button onClick={() => {
                            history(`/room/${roomID}`)
                        }}>Join Room</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => {
                history(`/room/${v4()}`)
            }}>Create new room</button><br/><br/><br/>
        </div>   */