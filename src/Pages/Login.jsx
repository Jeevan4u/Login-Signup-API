import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../features/slice/auth/authSlice";
export default function Login() {
  const { loading, error, success, role, userToken, login } = useSelector(
    (state) => state.auth
  );
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(userLogin(data));
  };
  useEffect(() => {
    if (login) {
      if (login && role === "super_admin") {
        navigate("/admin");
        toast("User Login to Super Admin");
      } else {
        navigate("/orderDashboard");
        toast("User Login to  Admin");
      }
    }
  }, [login]);
  useEffect(() => {
    if (success) {
      toast("New category Added");
    }
  }, [success]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-[#0d9544]">
      <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-[#1676bc] shadow-md overflow-hidden sm:rounded-lg ">
        <h1 className="text-2xl font-bold text-gray-700">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="block w-full p-3 rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              placeholder="Enter your email"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
                  message: "please enter email correctly",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="block w-full p-3 rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              placeholder="Enter your password"
              {...register("password", {
                required: "This field is required",
              })}
            />
            {errors.password && (
              <p className="text-red-600 mt-1">{errors.password.message}</p>
            )}
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full p-3 rounded-md bg-blue-500 text-white font-bold hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            >
              {loading ? "Sign in..." : "Sign in"}
            </button>
          </div>
        </form>
        <div className="flex justify-end mt-6">
          <Link to={"/registerjeevan"} className="text-white">
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
}
