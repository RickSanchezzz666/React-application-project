import React from "react";
import { useNavigate } from "react-router";
export {redirectAvailability};

let redirectAvailability = true;

function RedirectingPage() {
    const navigate = useNavigate();

    let pathName = window.location.pathname;
    let pathNameSlice = pathName.slice(13, 42);
    let redirectPath = `/redirect/${pathNameSlice}`;

    if(redirectAvailability === true) {
        setTimeout(() => {
            navigate(redirectPath);
            redirectAvailability = false;
        }, 0);
    }


    return(<div></div>)
}

export default RedirectingPage;