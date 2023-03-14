import React from "react";
import API from "../../features/api/axios";

import Mycontext from "../../Context/Mycontext";
import { useState, useContext, useEffect } from "react";
import Table from "../components/Table";

const TablelistPage = ({ submitSuccess }) => {
  const { userData } = useContext(Mycontext);
  const [tableList, setTableList] = useState([]);
  const config = {
    headers: { Authorization: `Bearer ${userData.token}` },
  };

  const retrieveTable = RetriveDataTable(config, setTableList);

  useEffect(() => {
    retrieveTable();
  }, [submitSuccess]);

  return (
    <div>
      <div className="DisplayTable">
        <div className="tableWrapper">
          <Table data={tableList} />
        </div>
      </div>
    </div>
  );
};

export default TablelistPage;

function RetriveDataTable(config, setTableList) {
  return async () => {
    try {
      const { data } = await API.get("/tables", config);
      setTableList(data.data);
    } catch (error) {
      console.log(error);
    }
  };
}
