import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import axios from "axios";
import WebFont from "webfontloader";
import logo from "../../../../images/logo_blue.png";
import { Link } from "react-router-dom";

const RoomPassVerify = ({ children }) => {
  const [verify, setVerify] = useState(false);
  const [callPass, setCallPass] = useState("");

  const passErrRef = useRef();

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Arvo"],
      },
    });
    document.title = "Redirecting... | MedDoc";
  }, []);

  let pathName = window.location.pathname;
  let roomId = pathName.slice(6, 42);

  function redirectToCall() {
    if (callPass) {
      axios
        .get("/api/room-pass-verify", {
          params: {
            roomId: roomId,
            password: callPass,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setVerify(true);
          }
        })
        .catch((err) => {
          if (err) {
            return (passErrRef.current.className =
              "password-redirecting-page-error-visible");
          }
          setVerify(false);
        });
    }
  }

  function reloadFunc() {
    setTimeout(() => {
      window.location.reload()
    }, 0);
  }

  return verify ? (
    children
  ) : (
    <div className="password-redirecting-page">
      <div className="header-logo-room">
        <Link to="/" className="header-router" onClick={reloadFunc}>
          <img className="room-logo" src={logo} />
        </Link>
        <Link to="/" className="header-router" onClick={reloadFunc}>
          <span className="room-logo-name">MedDoc</span>
        </Link>
      </div>
      <div className="password-redirecting-page-input-wrapper">
        <div
          ref={passErrRef}
          className="password-redirecting-page-error-invisible"
        >
          Password is incorrect!
        </div>
        <div className="password-redirecting-page-input-text">
          Enter the Password to connect to{" "}
          <span className="password-redirecting-page-text-color">{roomId}</span>
        </div>
        <input
          type="text"
          id="password-redirecting-page-input"
          className="password-redirecting-page-input"
          onChange={(event) => setCallPass(event.target.value)}
        />
        <button className="meeting-join-button" onClick={redirectToCall}>
          Confirm the Password
        </button>
      </div>
    </div>
  );
};

export default RoomPassVerify;
