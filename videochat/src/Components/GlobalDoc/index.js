import React from "react";
import { useState } from "react";

const MyContextDoc = React.createContext();

const MyProviderDoc = ({ children }) => {
  const [doctorRoomCreate, setDoctorRoomCreate] = useState(false);

  return (
    <MyContextDoc.Provider value={[doctorRoomCreate, setDoctorRoomCreate]}>
      {children}
    </MyContextDoc.Provider>
  )

};

export { MyProviderDoc, MyContextDoc };
