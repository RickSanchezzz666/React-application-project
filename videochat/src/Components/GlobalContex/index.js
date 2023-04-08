import React from "react";
import { useState } from "react";

const MyContext = React.createContext();

const MyProvider = ({ children }) => {
  const [doctorRoomCreate, setDoctorRoomCreate] = useState(false);

  return (
    <MyContext.Provider value={[doctorRoomCreate, setDoctorRoomCreate]}>
      {children}
    </MyContext.Provider>
  )

};

export { MyProvider, MyContext };
