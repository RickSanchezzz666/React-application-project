import React from "react";
import { useState } from "react";

const MyContext = React.createContext();

const MyProvider = ({ children }) => {
    const [globalAuth, setGlobalAuth] = useState(false);

return (
    <MyContext.Provider value={[globalAuth, setGlobalAuth]}>
      {children}
    </MyContext.Provider>
  )

};

export { MyProvider, MyContext };
