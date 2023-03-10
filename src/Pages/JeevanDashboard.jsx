import React, { useContext, useEffect } from "react";
import Store from "../Context/Mycontext";
import { useNavigate } from "react-router-dom";
const JeevanDashboard = () => {
  const { userData } = useContext(Store);
  const navigator = useNavigate();
  console.log(userData);

  useEffect(() => {
    if (userData?.token) {
      if (userData.role === "admin") {
        console.log("User Navigated to Admin pannel");
      } else if (userData.role === "superAdmin") {
        console.log("User Navigated to Superadmin Pannel");
      }
    } else {
      navigator("/");
    }
  }, [userData.token]);

  return <div>JeevanDashboard</div>;
};

export default JeevanDashboard;
