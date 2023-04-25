import React from "react";
import { useState } from "react";

const MyContext = React.createContext();

const MyProvider = ({ children }) => {
  const [doctorRoomCreate, setDoctorRoomCreate] = useState(false);
  const [adminRoomCreate, setAdminRoomCreate] = useState(false);
  const [userCabJoin, setUserCabJoin] = useState(false);
  const [globalAuth, setGlobalauth] = useState(false);


  return (
    <MyContext.Provider value={[doctorRoomCreate, setDoctorRoomCreate, globalAuth, setGlobalauth, adminRoomCreate, setAdminRoomCreate, userCabJoin, setUserCabJoin]}>
      {children}
    </MyContext.Provider>
  )

};

export { MyProvider, MyContext };
