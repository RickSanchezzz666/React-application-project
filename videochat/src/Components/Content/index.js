import React, { useEffect, useState } from "react";
import './style.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CountUp from 'react-countup';
import Header from '../Header/Header';
import Footer from "../Footer/Footer";
import doctorMainImage from '../../images/people_phone.png';
import doctorImage1 from '../../images/vuyko_left.png';
import doctorImage2 from '../../images/vuyko_centr.png';
import doctorImage3 from '../../images/vuyko_right.png';
import doctorImage4 from '../../images/vuyko_at_the_end.png';
import phone from '../../images/call.png'
import WebFont from 'webfontloader';
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router";

function Content() {
    AOS.init({
      once: true,
    });

    useEffect(() => {
      WebFont.load({
        google: {
          families: ['Bree Serif']
        }
      });
      document.title = "MedDoc";
     }, []);

     const navigate = useNavigate();

     const { ref, inView} = useInView({triggerOnce: true});

     const [callCode, setCallCode] = useState('');

     function joinCallCode() {
      let callCodePath = `/redirecting/${callCode}`;
      navigate(callCodePath);
     }

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
            <input type="text" id="container-1-call-code" className="meeting-input" onChange={(event) => setCallCode(event.target.value)} />
            <button className="meeting-join-button" onClick={joinCallCode}>Join meeting</button>  
          </div>
        </div>
        <div className="container-1-doctor-img">
          <img data-aos="fade-up" data-aos-delay="200" src={doctorMainImage} alt="" className="doctor-image" />
        </div>

      </div>  
      <div className="about-us-container-2">
        <div className="container-2-wrapper">
          <div className="container-2-cont-1" data-aos="flip-left">
            <div className="container-2-text-1">
              <p className="container-2-text-2">Consultation of a family doctor</p>
              <p className="container-2-text-2">Get medical help online</p>
              <p className="container-2-text-2">Doctor's consultation in one click (video/audio/chat)</p>
            </div>
              <div className="doctor-image-1"><img src={doctorImage1} alt="" className="container-2-image-1"/></div>
            </div>
            <div className="container-2-cont-2" data-aos="flip-right" data-aos-delay="100">
              <div className="container-2-text-1">
                <p className="container-2-text-3">Ordering medicines online</p>
                <p className="container-2-text-3">Search and reservation of drugs with a discount</p>
              </div>
              <div className="doctor-image-1">
                <img src={doctorImage2} alt="" className="container-2-image-2"/>
              </div>
            </div>
            <div className="container-2-cont-3" data-aos="flip-up" data-aos-delay="200">
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
        <div ref={ref} className="container-3-grid">
          <div className="container-3-cont-1" data-aos="fade-up">
            {inView ? <CountUp className="container-3-num" duration={3} end={40000} /> : null}
          <div className="container-3-down-text">USERS</div>
          </div>
          <div className="container-3-cont-2" data-aos="fade-up" data-aos-delay="100">
            {inView ? <CountUp className="container-3-num" duration={3.5} end={600} /> : null}
            <div className="container-3-down-text">DOCTORS</div>
          </div>
          <div className="container-3-cont-3" data-aos="fade-up" data-aos-delay="200">
            {inView ? <CountUp className="container-3-num" duration={4} end={5000} /> : null}
            <div className="container-3-down-text">POSITIVE REVIEWS</div>
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
    <Footer />

    </div>
    )
}

export default Content;
