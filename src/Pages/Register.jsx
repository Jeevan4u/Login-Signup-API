import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import axios from '../features/api/axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../features/slice/auth/authSlice'
export default function Register() {
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth,
  )

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onSubmit = (data) => {
    console.log(data)
    dispatch(registerUser(data))
  }
  useEffect(() => {
    if (success) {
      navigate('/')
    }
  }, [success])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-[#0d9544]">
      <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-[#1676bc] shadow-md overflow-hidden sm:rounded-lg ">
        <h1 className="text-2xl font-bold text-gray-700">Register Now</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="email"
              className="block w-full p-3 rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              placeholder="Enter your email"
              {...register('name', {
                required: 'This field is required',
              })}
            />
            {errors.name && (
              <p className="text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="mt-4">
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
              {...register('email', {
                required: 'This field is required',
                pattern: {
                  value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
                  message: 'please enter email correctly',
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
              type="text"
              id="password"
              className="block w-full p-3 rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              placeholder="Enter your password"
              {...register('password', {
                required: 'This field is required',
              })}
            />
            {errors.password && (
              <p className="text-red-600 mt-1">{errors.password.message}</p>
            )}
          </div>
          <div className="mt-4">
            <label
              htmlFor="c_password"
              className="block text-gray-700 font-bold mb-2"
            >
              Confirm Password
            </label>
            <input
              type="text"
              id="c_password"
              className="block w-full p-3 rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              placeholder="Enter your password"
              {...register('c_password', {
                required: 'This field is required',
                validate: () =>
                  watch().c_password === watch().password ||
                  'The passwords do not match',
              })}
            />
            {errors.c_password && (
              <p className="text-red-600 mt-1">{errors.c_password.message}</p>
            )}
          </div>
          <div className="mt-4">
            <label
              htmlFor="role"
              className="block text-gray-700 font-bold mb-2"
            >
              Role
            </label>
            <select
              {...register('role', {
                required: 'This field is required',
              })}
              className="py-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            >
              <option value="" disabled selected hidden className="">
                Please Select your role
              </option>
              <option value="1">Super Admin</option>
              <option value="2">Admin</option>
            </select>
            {errors.role && (
              <p className="text-red-600 mt-1">{errors.role.message}</p>
            )}
          </div>
          <div className="mt-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-bold mb-2"
            >
              Phone
            </label>
            <input
              type="number"
              id="phone"
              className="block w-full p-3 rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              placeholder="Enter your password"
              {...register('phone', {
                required: 'This field is required',
              })}
            />
            {errors.phone && (
              <p className="text-red-600 mt-1">{errors.phone.message}</p>
            )}
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full p-3 rounded-md bg-blue-500 text-white font-bold hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            >
              {loading ? 'Sign up...' : 'Sign up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
