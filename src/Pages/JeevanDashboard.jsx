import React, { useContext, useEffect, useState } from "react";
import Store from "../Context/Mycontext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import CreateTable from "./CreateTable";
import AddCat from "./Addcategory/AddCat";
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
      <div className="logOUT flex justify-around">
        <div className="dashboard">
          <h1>Dashboard</h1>
        </div>
        <button
          className="p-2 border-[2px] border-black"
          onClick={logOutHandler}
        >
          LogOut
        </button>
      </div>
      <AddCat />
      {/* <CreateTable />  List of table*/}
    </div>
  );
};

export default JeevanDashboard;
