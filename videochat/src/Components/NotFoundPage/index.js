import React from "react";
import './style.css';

function NotFound () {
    return (
        <div className="NotFoundPage">
            <h1 className="main-text" data-aos="fade-right" data-aos-delay="100">Error 404</h1>
            <h2 className="sub-text" data-aos="fade-left" data-aos-delay="200">Page not Found : (</h2>
        </div>
    )
}

export default NotFound;