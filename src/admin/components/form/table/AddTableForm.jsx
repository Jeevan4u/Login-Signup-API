import React, { useState, useMemo, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import {
  addingTable,
  resetState,
} from '../../../../features/slice/tableSlice/tableSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

export default function AddTableForm() {
  const navigate = useNavigate()
  const { loading, error, success } = useSelector((state) => state.category)
  const {
    gettingTableSuccess,
    postingTableSuccess,
    postingTableLoading,
  } = useSelector((state) => state.table)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const onSubmit = (data) => {
    console.log(data)
    dispatch(addingTable(data))
  }
  useEffect(() => {
    if (postingTableSuccess) {
      toast('table added successfully')
      dispatch(resetState())
      navigate('/admin/table')
    }
  }, [postingTableSuccess])
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-4 gap-4 mb-[60px]">
        <div className="col-span-4 ">
          <div className="inputContainer mb-[12px] grid grid-cols-4 gap-2">
            <div className="col-span-1 flex items-center">
              <label className="text-[14px] ">Name</label>
            </div>
            <div className="col-span-3 ">
              <input
                type="text"
                className="custom-input"
                placeholder="Enter Table"
                {...register('name', { required: true })}
              />
            </div>
          </div>

          <div className="grid grid-cols-4">
            <div className="col-span-1 flex flex-col justify-between"></div>
          </div>
        </div>
      </div>
      <div className="flex ml-auto justify-end gap-4">
        <button
          className="btn-primary"
          type="submit"
          disabled={postingTableLoading}
        >
          {postingTableLoading ? 'ADD...' : 'ADD'}
        </button>
        <button className="btn-secondary" onClick={() => reset()}>
          RESET
        </button>
      </div>
    </form>
  )
}
