import React, { useContext, useEffect, useState } from "react";
import Store from "../Context/Mycontext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const JeevanDashboard = () => {
  const { userData } = useContext(Store);
  const { userDataHandler } = useContext(Store);

  const navigator = useNavigate();
  const clearData = {
    role: null,
    token: null,
    success: null,
  };
  useEffect(() => {
    if (!userData.token) {
      navigator("/");
    }
  }, [userData]);

  const logOutHandler = (e) => {
    Cookies.remove("userToken");

    userDataHandler(clearData.role, clearData.token, clearData.success);
  };

  return (
    <div>
      <div className="logOUT">
        Dashboard
        <button
          className="p-2 border-[2px] border-black"
          onClick={logOutHandler}
        >
          LogOut
        </button>
      </div>
    </div>
  );
};

export default JeevanDashboard;
