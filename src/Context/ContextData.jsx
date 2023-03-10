import { useState } from "react";
import Mycontext from "./Mycontext";

const ContextData = (props) => {
  const [userData, setUserData] = useState({
    role: "",
    token: "",
    success: false,
  });

  const userDataHandler = (role, token, success) => {
    setUserData((prevState) => ({
      ...prevState,
      role,
      token,
      success,
    }));
  };
  return (
    <div>
      <Mycontext.Provider value={{ userData, userDataHandler }}>
        {props.children}
      </Mycontext.Provider>
      ;
    </div>
  );
};

export default ContextData;
