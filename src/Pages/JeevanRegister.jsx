import React, { useState, useEffect } from "react";
import "./fonts.css";
import Eye from "../Pages/assets/Images/Eyes.png";
import down from "../Pages/assets/Images/drop.png";
import axiosAPI from "../features/api/axios";
import { useNavigate } from "react-router-dom";
const JeevanRegister = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    c_password: "",
    role: "",
    phone: "",
  });
  const navigate = useNavigate();
  const [sucess, setSucess] = useState(false);
  const [formError, setFormError] = useState({});

  const inputHandlerName = (e) => {
    setInput((prevState) => ({ ...prevState, name: e.target.value }));
    setFormError((prevState) => ({ ...prevState, state: false }));
  };
  const inputHandlerEmail = (e) => {
    setInput((prevState) => ({ ...prevState, email: e.target.value }));
    setFormError((prevState) => ({ ...prevState, state: false }));
  };
  const inputHandlerPassword = (e) => {
    setInput((prevState) => ({ ...prevState, password: e.target.value }));
    setFormError((prevState) => ({ ...prevState, state: false }));
  };
  const inputHandlerCpassword = (e) => {
    setInput((prevState) => ({ ...prevState, c_password: e.target.value }));
    setFormError((prevState) => ({ ...prevState, state: false }));
  };
  const inputHandlerRole = (e) => {
    setInput((prevState) => ({ ...prevState, role: parseInt(e.target.value) }));
    setFormError((prevState) => ({ ...prevState, state: false }));
  };
  const inputHandlerPhone = (e) => {
    setInput((prevState) => ({ ...prevState, phone: e.target.value }));
    setFormError((prevState) => ({ ...prevState, state: false }));
  };
  const clearData = () => {
    setInput({
      name: "",
      email: "",
      password: "",
      c_password: "",
      role: "",
      phone: "",
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    setFormError(validateInput(input));
    setSucess(true);
    // postData();
  };

  useEffect(() => {
    if (Object.keys(formError).length === 0 && sucess) {
      postData();
    }
  }, [formError]);

  // console.log(formError);
  const validateInput = (input) => {
    const error = {};
    const isEmailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isPasswordValid =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const isPhoneValid = /(\+977)?[9][6-9]\d{8}/;
    if (!input.name) {
      error.userName = "UserName is required";
      error.state = true;
    } else if (!input.email) {
      error.email = "Email feild is empty";
      error.state = true;
    } else if (!isEmailValid.test(input.email)) {
      error.email = "Email is not Valid";
      error.state = true;
    } else if (!input.password) {
      error.password = "Password Feild is empty";
      error.state = true;
    } else if (!isPasswordValid.test(input.password)) {
      error.password = "Password is not valid";
      error.state = true;
    } else if (!input.c_password) {
      error.c_password = "Confirm Password Feild is empty";
      error.state = true;
    } else if (input.c_password !== input.password) {
      error.state = true;
      error.c_password = "Password Dosent Match";
    } else if (!input.role) {
      error.role = "Please Select your role";
      error.state = true;
    } else if (!input.phone) {
      error.state = true;
      error.phone = "Phone Number Cannot be empty";
    } else if (!isPhoneValid.test(input.phone)) {
      error.state = true;
      error.phone = "Phone Number Format is incorrect";
    }

    return error;
  };
  const postData = async () => {
    try {
      const res = await axiosAPI.post("/register", input);
      console.log(res);

      if (res.data.success) {
        navigate("/");
        clearData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(input);
  return (
    <div className="RegisterContainer">
      <div className="grid xl:grid-cols-2 sm:grid-cols-1">
        <div className="left bg-Stroke bg-no-repeat bg-right-bottom bg-cover my-5 xl:order-2">
          <div className="formWrapper max-w-[400px] mx-auto">
            <div className="GetStartedSection mb-[20px]">
              <h1 className="font-extrabold">Lets get you Started</h1>
            </div>
            <div className="form_container mb-[32px]">
              <form>
                <div className="FullName my-[24px]">
                  <label
                    htmlFor=""
                    className="mb-[4px] font-[400] text-[16px] leading-[24px]"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={input.name}
                    className="appearance-none py-[12px] pl-[16px] w-full bg-transparent border-[2px] border-gray-400 rounded-md"
                    onChange={inputHandlerName}
                  />
                  {formError.state === true && <h1>{formError.userName}</h1>}
                </div>
                <div className="Email address my-[24px]">
                  <label
                    htmlFor=""
                    className="mb-[4px] font-[400] text-[16px] leading-[24px]"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="yourname@email.com"
                    value={input.email}
                    className="appearance-none py-[12px] pl-[16px] w-full  bg-transparent border-[2px] border-gray-400 rounded-md"
                    onChange={inputHandlerEmail}
                  />
                  {formError.state === true && <h1>{formError.email}</h1>}
                </div>
                <div className="password address my-[24px] relative">
                  <label
                    htmlFor=""
                    className="mb-[4px] font-[400] text-[16px] leading-[24px]"
                  >
                    Create Password
                  </label>
                  <input
                    type="password"
                    value={input.password}
                    placeholder="XXXXXXXXXXXXXX"
                    className=" appearance-none py-[12px] pl-[16px] w-full  bg-transparent border-[2px] border-gray-400 rounded-md"
                    onChange={inputHandlerPassword}
                  />

                  <img
                    src={Eye}
                    alt=""
                    className="object-cover w-[20px] absolute top-[60%] right-3"
                  />
                  {formError.state === true && <h1>{formError.password}</h1>}
                </div>

                <div className="Confirmpassword address my-[24px] relative">
                  <label
                    htmlFor=""
                    className="mb-[4px] font-[400] text-[16px] leading-[24px]"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="XXXXXXXXXXXXXX"
                    value={input.c_password}
                    className=" appearance-none py-[12px] pl-[16px] w-full  bg-transparent border-[2px] border-gray-400 rounded-md"
                    onChange={inputHandlerCpassword}
                  />

                  <img
                    src={Eye}
                    alt=""
                    className="object-cover w-[20px] absolute top-[60%] right-3"
                  />
                  {formError.state === true && <h1>{formError.c_password}</h1>}
                </div>
                <div className="DropDown my-[24px] relative">
                  <label
                    htmlFor=""
                    className="mb-[4px] font-[400] text-[16px] leading-[24px]"
                  >
                    Role
                  </label>
                  <select
                    name="Roles"
                    id=""
                    className="relative appearance-none  py-[12px] pl-[16px] w-full  bg-transparent border-[2px] border-gray-400 rounded-md z-10"
                    onClick={inputHandlerRole}
                  >
                    <option value="none" selected disabled hidden>
                      Please Select Role
                    </option>
                    <option value="1">SuperAdmin</option>
                    <option value="2">Admin </option>
                  </select>
                  <div className="downicon absolute top-[45%] right-2 z-0">
                    <img src={down} alt="" className="w-[30px]" />
                  </div>

                  {formError.state === true && <h1>{formError.role}</h1>}
                </div>
                <div className="Phonenumber my-[24px]">
                  <label
                    htmlFor=""
                    className="mb-[4px] font-[400] text-[16px] leading-[24px]"
                  >
                    Phone Number
                  </label>
                  <input
                    type="number"
                    placeholder="+977"
                    value={input.phone}
                    className="appearance-none py-[12px] pl-[16px] w-full bg-transparent border-[2px] border-gray-400 rounded-md"
                    onChange={inputHandlerPhone}
                  />
                  {formError.state === true && <h1>{formError.phone}</h1>}
                </div>
                <div className="Button my-[24px]">
                  <button
                    className="w-full bg-[#284A5E] rounded-sm py-[8px]"
                    onClick={submitHandler}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
            <div className="user flex justify-center">
              <h1 className="text-[#C4C4C4] font-[700] text-[16px] leading-[24px]">
                Already A user ?
              </h1>
              <h1
                className="text-[#476D73] font-[700] text-[16px] leading-[24px] underline ml-2 cursor-pointer"
                onClick={() => navigate("/")}
              >
                Login
              </h1>
            </div>
          </div>
        </div>
        <div className="Right bg-gradient-to-b from-[#517879] to-[#1E3E57] grid place-content-center">
          <div className="rightContent ">
            <h1 className="max-w-[431px] mx-auto font-[700] text-[64px] leading-[96px] text-white">
              “Creativity is intelligence having fun”
            </h1>
            <span className="text-white">-lorem ipsum</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JeevanRegister;
