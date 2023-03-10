import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
  addingItem,
  resetState,
} from '../../../../features/slice/item/itemSlice'

export default function AddItemForm({ mainCategoryList, subCategoryList }) {
  const { loading, success } = useSelector((state) => state.item)
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()
  const dispatch = useDispatch()
  const [imageSrc, setImageSrc] = useState('')

  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0]
  //   const reader = new FileReader()
  //   reader.onload = () => {
  //     setImageSrc(reader.result)
  //   }
  //   reader.readAsDataURL(file)
  // }
  useEffect(() => {
    if (watch().image[0]) {
      const reader = new FileReader()
      reader.onload = () => {
        setImageSrc(reader.result)
      }
      reader.readAsDataURL(watch().image[0])
    }
    if (watch().image.length === 0) {
      setImageSrc(null)
    }
  }, [watch()])
  // useEffect(() => {
  //   if (success) {
  //     toast('Categories added successfully')
  //     reset()
  //     dispatch(resetState())
  //   }
  // }, [success])
  const onSubmit = (data) => {
    console.log(data)
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('code', data.code)
    formData.append('image', data.image[0])
    formData.append('included_item', data.included_item)
    formData.append('comments', data.comments)
    formData.append('sub_category_id', data.sub_category_id)
    formData.append('price', data.price)
    formData.append('category_id', data.category_id)
    dispatch(addingItem(formData))
  }
  // console.log(watch())
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-4 gap-4 mb-[60px]">
        <div className="col-span-3 ">
          <div className="inputContainer mb-[12px] grid grid-cols-4 gap-2">
            <div className="col-span-1 flex items-center">
              <label className="text-[14px] ">CATEGORY</label>
            </div>
            <div className="col-span-3 ">
              <select
                {...register('category_id', {
                  required: 'This field is required',
                })}
                className="py-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full bg-[#f2f3f3]  "
              >
                <option
                  value=""
                  disabled
                  selected
                  hidden
                  className="text-[#9ca3be]"
                >
                  Please Select Category
                </option>
                {mainCategoryList &&
                  mainCategoryList.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.title}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="inputContainer mb-[12px] grid grid-cols-4 gap-2">
            <div className="col-span-1 flex items-center">
              <label className="text-[14px] ">SUB CATEGORY</label>
            </div>
            <div className="col-span-3 ">
              <select
                {...register('sub_category_id', {
                  required: 'This field is required',
                })}
                className="py-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full bg-[#f2f3f3]  "
              >
                <option
                  value=""
                  disabled
                  selected
                  hidden
                  className="text-[#9ca3be]"
                >
                  Please Select Sub Category
                </option>
                {subCategoryList &&
                  subCategoryList.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.title}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="inputContainer mb-[12px] grid grid-cols-4 gap-2">
            <div className="col-span-1 flex items-center">
              <label className="text-[14px] ">TITLE*</label>
            </div>
            <div className="col-span-3 ">
              <input
                type="text"
                className="custom-input"
                placeholder="ITEM NAME"
                {...register('title', { required: true })}
              />
            </div>
          </div>
          <div className="inputContainer mb-[12px] grid grid-cols-4 gap-2">
            <div className="col-span-1 flex items-center">
              <label className="text-[14px] ">PRICE*</label>
            </div>
            <div className="col-span-3 ">
              <input
                type="number"
                className="custom-input"
                placeholder="PRICE"
                {...register('price', { required: true })}
              />
            </div>
          </div>
          <div className="inputContainer  grid grid-cols-4 gap-2">
            <div className="col-span-1 flex items-center">
              <label className="text-[14px] ">DESCRIPTION</label>
            </div>
            <div className="col-span-3 ">
              <input
                type="text"
                className="custom-input"
                placeholder="SHORT DESCRIPTION"
                {...register('description', { required: true })}
              />
            </div>
          </div>
        </div>

        <div className="col-span-1 flex flex-col justify-between">
          <div className="textContainer">
            <p className="text-center">ITEM CODE: 0938</p>
          </div>

          <label
            // htmlFor="imageInput"
            className="border-[#e1e2e3]   imageContainer  "
          >
            <div className="border-[#e1e2e3] border-2  imageContainer  h-[196px] w-full relative bg-[#f2f3f3] flex justify-center items-center">
              <input
                type="file"
                id="imageInput"
                className=" h-full w-full hidden"
                {...register('image', { required: true })}
                // onChange={handleImageUpload}
              />
              {imageSrc && (
                <img
                  className="w-full h-full absolute top-0 left-0  z-3"
                  src={imageSrc}
                  alt=""
                />
              )}
              <p className="text-[12px]">ADD ICON OR IMAGE</p>
            </div>
          </label>
        </div>
        <div className="col-span-4  ">
          <div className="inputContainer mb-[12px] flex justify-between   gap-2">
            <div className="col-span-1 flex items-center flex-grow">
              <label className="text-[14px] ">INCLUDED</label>
            </div>
            <div className="col-span-6  w-[81%]">
              <input
                type="text"
                className="custom-input"
                placeholder="INCLUDED ITEM"
                {...register('included_item', { required: true })}
              />
            </div>
          </div>
          <div className="inputContainer mb-[12px] flex justify-between   gap-2">
            <div className="col-span-1 flex items-center flex-grow">
              <label className="text-[14px] ">EXTRA</label>
            </div>
            <div className="col-span-6  w-[81%]">
              <input
                type="text"
                className="custom-input"
                placeholder="IF EXTRA COMMENTS"
                {...register('comments', { required: true })}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex ml-auto justify-end gap-4">
        <button className="btn-primary" type="submit">
          ADD
        </button>
        <button className="btn-secondary">RESET</button>
      </div>
    </form>
  )
}
