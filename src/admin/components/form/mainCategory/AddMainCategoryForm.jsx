import React, { useState, useMemo, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { mainCategoryAdding } from '../../../../features/slice/category/categorySlice'
import { toast } from 'react-toastify'
import { resetState } from '../../../../features/slice/category/categorySlice'
export default function AddMainCategoryForm() {
  const { loading, error, success } = useSelector((state) => state.category)
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const [imageSrc, setImageSrc] = useState('')

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
  useEffect(() => {
    if (success) {
      toast('Categories added successfully')
      reset()
      dispatch(resetState())
    }
  }, [success])
  const onSubmit = (data) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('code', data.code)
    formData.append('image', data.image[0])
    dispatch(mainCategoryAdding(formData))
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-4 gap-4 mb-[60px]">
        <div className="col-span-4 ">
          <div className="inputContainer mb-[12px] grid grid-cols-4 gap-2">
            <div className="col-span-1 flex items-center">
              <label className="text-[14px] ">Title</label>
            </div>
            <div className="col-span-3 ">
              <input
                type="text"
                className="custom-input"
                placeholder="SELECT CATEGORY"
                {...register('title', { required: true })}
              />
            </div>
          </div>
          <div className="inputContainer mb-[12px] grid grid-cols-4 gap-2">
            <div className="col-span-1 flex items-center">
              <label className="text-[14px] ">Description</label>
            </div>
            <div className="col-span-3 ">
              <input
                type="text"
                className="custom-input"
                placeholder="SELECT SUB CATEGORY"
                {...register('description', { required: true })}
              />
            </div>
          </div>
          <div className="inputContainer mb-[12px] grid grid-cols-4 gap-2">
            <div className="col-span-1 flex items-center">
              <label className="text-[14px] ">Code</label>
            </div>
            <div className="col-span-3 ">
              <input
                type="text"
                className="custom-input"
                placeholder="ITEM NAME"
                {...register('code', { required: true })}
              />
            </div>
          </div>
          <div className="inputContainer mb-[12px] grid grid-cols-4 gap-2">
            <div className="col-span-1 flex items-center"></div>
            <div className="col-span-2 grid grid-cols-4">
              <label
                // htmlFor="imageInput"
                className="border-[#e1e2e3]   imageContainer  col-span-2  "
              >
                <div className="border-[#e1e2e3] border-2  imageContainer aspect-square w-full relative bg-[#f2f3f3] flex justify-center items-center">
                  <input
                    type="file"
                    id="imageInput"
                    className=" h-full w-full hidden"
                    accept="image/png, image/gif, image/jpeg"
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
          </div>

          <div className="grid grid-cols-4">
            <div className="col-span-1 flex flex-col justify-between"></div>
          </div>
        </div>
      </div>
      <div className="flex ml-auto justify-end gap-4">
        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? 'ADD...' : 'ADD'}
        </button>
        <button className="btn-secondary" onClick={() => reset()}>
          RESET
        </button>
      </div>
    </form>
  )
}
