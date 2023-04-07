import React from "react";
import { useState } from "react";

const MyContext = React.createContext();

const MyProvider = ({ children }) => {
  const [globalAuth, setGlobalAuth] = useState(false);
  const [doctorRoomCreate, setDoctorRoomCreate] = useState(false);

  return (
    <MyContext.Provider value={[globalAuth, setGlobalAuth, doctorRoomCreate, setDoctorRoomCreate]}>
      {children}
    </MyContext.Provider>
  )

};

export { MyProvider, MyContext };
