import { useState, useReducer } from "react";
import Mycontext from "./Mycontext";
import Cookies from "js-cookie";
const ContextData = (props) => {
  const [userData, setUserData] = useState({
    role: "",
    token: Cookies?.get("userToken"),
    success: null,
  });

  // const initialState = {
  //   role: "",
  //   token: Cookies?.get("userToken"),
  //   success: false,
  // };
  // const reducer = (initialState, action) => {
  //   switch (action.type) {
  //     case "userDataHandler":
  //       return setUserData((prevState) => ({
  //         ...prevState,
  //         role,
  //         token,
  //         success,
  //       }));
  //     default:
  //       return state;
  //   }
  // };
  const userDataHandler = (role, token, success) => {
    setUserData((prevState) => ({
      ...prevState,
      role,
      token,
      success,
    }));
  };
  // const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <Mycontext.Provider value={{ userData, userDataHandler }}>
        {props.children}
      </Mycontext.Provider>
    </div>
  );
};

export default ContextData;
