import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../features/api/axios";
import ContextStore from "../Context/Mycontext";
import Cookies from "js-cookie";
const JeevanLogin = () => {
  const { userDataHandler, userData } = useContext(ContextStore);
  console.log(userData);
  const navigation = useNavigate();
  const initial = {
    email: "",
    password: "",
  };
  const [formInput, setFormInput] = useState(initial);
  const [formError, setFormError] = useState({ state: false });
  const [loginSuccess, setLoginSuccess] = useState({
    succeess: false,
    role: "",
    token: "",
  });
  const formEmailHandler = (e) => {
    setFormInput((prevState) => ({ ...prevState, email: e.target.value }));
    setFormError((prevState) => ({ ...prevState, state: false }));
  };
  const formPasswordHandler = (e) => {
    setFormInput((prevState) => ({ ...prevState, password: e.target.value }));
  };

  useEffect(() => {
    if (Object.keys(formError).length === 0) {
      postLoginData();
    }
  }, [formError]);
  useEffect(() => {
    if (userData?.token || userData.success) {
      navigation("/jeevandashboard");
    }
  }, [userData]);

  const postLoginData = async () => {
    try {
      const res = await Api.post("/login", formInput);
      //   console.log(res);
      if (res.data.success) {
        // console.log(res.data.data.token);
        console.log(res.data.data.token);
        Cookies.set("userToken", res.data.data.token);
        userDataHandler(
          res.data.data.role,
          res.data.data.token,
          res.data.success
        );
        // setLoginSuccess((prevState) => ({
        //   ...prevState,
        //   succeess: res.data.success,
        //   token: res.data.data.token,
        //   role: res.data.data.role,
        // }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setFormError(validation(formInput));
  };

  const validation = (formInput) => {
    const error = {};
    const isEmailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isPasswordValid =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (!formInput.email) {
      error.email = "Email feild is empty";
      error.state = true;
    } else if (!formInput.password) {
      error.password = "Password Feild is empty";
      error.state = true;
    }

    return error;
  };
  //   console.log(formInput);
  return (
    <div className="RegisterContainer ">
      <div className="grid xl:grid-cols-2 sm:grid-cols-1">
        <div className="left bg-Stroke bg-no-repeat bg-right-bottom bg-cover my-5 py-[170px]">
          <div className="formWrapper max-w-[400px] mx-auto">
            <div className="GetStartedSection mb-[20px]">
              <h1 className="font-extrabold">Welcome Back : User,</h1>
            </div>
            <div className="form_container mb-[32px]">
              <form>
                <div className="Email address my-[24px]">
                  <label
                    htmlFor=""
                    className="mb-[4px] font-[400] text-[16px] leading-[24px]"
                  >
                    Enter Email address :
                  </label>
                  <input
                    type="email"
                    value={formInput.email}
                    onChange={formEmailHandler}
                    placeholder="yourname@email.com"
                    className="appearance-none py-[12px] pl-[16px] w-full  bg-transparent border-[2px] border-gray-400 rounded-md"
                  />
                  {formError.state === true && <h1>{formError.email}</h1>}
                </div>
                <div className="password address my-[24px] relative">
                  <label
                    htmlFor=""
                    className="mb-[4px] font-[400] text-[16px] leading-[24px]"
                  >
                    Enter Your Password
                  </label>
                  <input
                    type="password"
                    placeholder="XXXXXXXXXXXXXX"
                    value={formInput.password}
                    className=" appearance-none py-[12px] pl-[16px] w-full  bg-transparent border-[2px] border-gray-400 rounded-md"
                    onChange={formPasswordHandler}
                  />

                  <img
                    src=""
                    alt=""
                    className="object-cover w-[20px] absolute top-[60%] right-3"
                  />
                  {formError.state && <h1>{formError.password}</h1>}
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
                Need An Account ?
              </h1>
              <h1
                className="text-[#476D73] font-[700] text-[16px] leading-[24px] underline ml-2 cursor-pointer"
                onClick={() => navigation("/registerjeevan")}
              >
                Sign Up
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

export default JeevanLogin;
