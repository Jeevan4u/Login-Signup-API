import React, { useContext, useState } from "react";
import AddCat from "../Addcategory/AddCat";
import { useEffect } from "react";
import API from "../../features/api/axios";
import Store from "../../Context/Mycontext";
const SubCategory = () => {
  const { userData } = useContext(Store);
  const SubCategoryDatas = {
    category: "Sub Category",
    postSubCategory: "sub_categories",
  };
  const [mainCatagoryData, setMainCategoryData] = useState([]);
  const config = {
    headers: { Authorization: `Bearer ${userData.token}` },
  };

  const getMainCategoryData = async () => {
    try {
      const { data } = await API.get("/categories", config);
      //   console.log(data.data);
      setMainCategoryData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(mainCatagoryData);
  useEffect(() => {
    getMainCategoryData();

    return () => {
      setMainCategoryData([]);
    };
  }, []);

  //   const filterTitle = mainCatagoryData.map((items, data) => items.title);
  //   console.log(filterTitle);

  return (
    <h1>
      <AddCat AddDetails={SubCategoryDatas} tittle={mainCatagoryData} />
    </h1>
  );
};

export default SubCategory;
