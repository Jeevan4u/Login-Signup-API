import React, { useState, useContext, useEffect } from "react";
import API from "../../features/api/axios";
import Store from "../../Context/Mycontext";
const AddCat = () => {
  const { userData } = useContext(Store);
  const [file, setFile] = useState("");
  const initialFormInput = {
    title: "",
    description: "",
    code: "",
  };
  const [formInput, setFormInput] = useState(initialFormInput);
  const [postCat, setPostCat] = useState(false);
  const formInputTitle = (e) => {
    setFormInput((prev) => ({ ...prev, title: e.target.value }));
  };
  const formInputdesc = (e) => {
    setFormInput((prev) => ({ ...prev, description: e.target.value }));
  };
  const formInputCode = (e) => {
    setFormInput((prev) => ({ ...prev, code: e.target.value }));
  };
  const fileHandler = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  const config = {
    headers: { Authorization: `Bearer ${userData.token}` },
  };

  const postCatData = async () => {
    try {
      const formData = new FormData();
      formData.append("title", formInput.title);
      formData.append("description", formInput.description);
      formData.append("code", formInput.code);
      formData.append("image", file);
      setPostCat(true);
      console.log("submittingdata");
      const { data } = await API.post("/categories", formData, config);
      setPostCat(false);
      console.log("submit Succesful");
    } catch (error) {
      console.log(error);
      setPostCat(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    postCatData();
  };
  console.log(postCat);
  return (
    <div className="bg-slate-300">
      <div className="AddCat border-[2px] border-black grid grid-cols-2">
        <div className="fromWrapper grid grid-cols-1 place-items-center">
          <form action="" className="flex flex-col justify-center items-end">
            <div className="titleContainer my-2">
              <label htmlFor="">title : </label>
              <input
                type="text"
                name="title"
                value={formInput.title}
                onChange={formInputTitle}
              />
            </div>
            <div className="descriptionContainer my-2">
              <label htmlFor="">description : </label>
              <input
                type="text"
                name="description"
                value={formInput.description}
                onChange={formInputdesc}
              />
            </div>
            <div className="descriptionContainer my-2">
              <label htmlFor="">code : </label>
              <input
                type="text"
                name="code"
                value={formInput.code}
                onChange={formInputCode}
              />
            </div>

            <button
              className="border-[2px] border-white p-2"
              onClick={handleSubmit}
            >
              {postCat ? "Submitting...." : "Submit"}
            </button>
          </form>
        </div>
        <div
          className={`previewImageContainer w-[250px] ${
            file ? null : "border-[2px] border-black"
          } relative`}
        >
          <div className="imgContainer">
            <label
              htmlFor="imageUpload"
              className="flex justify-center items-center absolute w-full h-full "
            >
              {file ? null : "Select Image or Icons"}
            </label>
            <input
              className="hidden"
              name="image"
              id="imageUpload"
              type="file"
              onChange={fileHandler}
            />
          </div>

          {file ? (
            <img
              src={URL.createObjectURL(file)}
              alt=""
              className="object-cover"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AddCat;
