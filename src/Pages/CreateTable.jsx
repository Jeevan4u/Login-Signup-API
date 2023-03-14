import React, { useState, useEffect, useContext } from "react";
import API from "../features/api/axios";
import Mycontext from "../Context/Mycontext";
import DashboardMain from "../admin/pages/DashboardMain";
import Table from "./components/Table";
import TablelistPage from "./TablePage/TablelistPage";
const CreateTable = () => {
  const { userData } = useContext(Mycontext);

  const initialTableData = {
    name: null,
  };
  const [tableInput, setTableInput] = useState(initialTableData);

  // const [tableList, setTableList] = useState([]);

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    postTableData();
  };
  const config = {
    headers: { Authorization: `Bearer ${userData.token}` },
  };

  const postTableData = async () => {
    try {
      setSubmitSuccess(true);
      const res = await API.post("/tables", tableInput, config);
      setSubmitSuccess(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Retreving Tables data
  // useEffect(() => {
  //   retrieveTable();
  // }, [submitSuccess]);

  // const retrieveTable = async () => {
  //   try {
  //     const { data } = await API.get("/tables", config);
  //     setTableList(data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   postTableData();
  // }, [submitSuccess]);
  // console.log(tableList);
  return (
    <>
      <div className="bg-slate-400 py-5 text-center">
        {/* <DashboardMain /> */}
        CreateTable
        <div className="formWrapper flex items-center flex-col justify-between">
          <label htmlFor="">Table Name</label>
          <input
            type="text"
            placeholder="Table name"
            onChange={(e) => setTableInput({ name: e.target.value })}
          />
          <button className="border p-2 mt-2" onClick={handleSubmit}>
            Sumbit
          </button>
        </div>
      </div>

      {/* <div className="DisplayTable">
        <div className="tableWrapper">
          <Table data={tableList} />
        </div>
      </div> */}
      <TablelistPage submitSuccess={submitSuccess} />
    </>
  );
};

export default CreateTable;
