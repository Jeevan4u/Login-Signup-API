import React, { useState, useMemo, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import {
  mainCategoryAdding,
  mainCategoryUpdating,
} from '../../../../features/slice/category/categorySlice'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import Loader from '../../../../Components/Loader'
export default function EditMainCategoryForm() {
  const { editId } = useParams()

  const { loading, error, success, mainCategoryList } = useSelector(
    (state) => state.category,
  )

  const [editData, setEditData] = useState(() =>
    mainCategoryList.filter((item) => item.id === Number(editId)),
  )
  if (!editData) {
    return <Loader />
  }
  const [imageUrl, setImageUrl] = useState(editData[0].image.link)
  console.log('editData', editData, 'imageUrl', imageUrl)
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: editData[0].title,
      description: editData[0].description,
      code: editData[0].code,
      image: null,
      image_id: editData[0].image.id,
    },
  })

  const dispatch = useDispatch()
  const [imageSrc, setImageSrc] = useState(null)
  useEffect(() => {
    if (watch().image) {
      const reader = new FileReader()
      reader.onload = () => {
        setImageSrc(reader.result)
      }
      reader.readAsDataURL(watch().image[0])
    }
  }, [watch()])
  const onSubmit = (data) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('code', data.code)
    if (imageSrc) {
      formData.append('image_id', editData[0].image.id)
      formData.append('image', data.image[0])
    } else {
      formData.append('image', editData[0].image.id)
    }
    formData.append('id', editData[0].id)
    dispatch(mainCategoryUpdating(formData))
  }
  console.log(watch())
  return (
    <div>
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
                      {...register('image')}
                      // onChange={handleImageUpload}
                    />
                    (
                    <img
                      className="w-full h-full absolute top-0 left-0  z-3"
                      src={
                        imageSrc
                          ? imageSrc
                          : `${import.meta.env.VITE_BASE_URL}/images/${
                              editData[0].image.link
                            }`
                      }
                      alt=""
                    />
                    )<p className="text-[12px]">ADD ICON OR IMAGE</p>
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
          <button className="btn-primary" type="submit">
            {loading ? 'ADD...' : 'ADD'}
          </button>
          <button className="btn-secondary" onClick={() => reset()}>
            RESET
          </button>
        </div>
      </form>
    </div>
  )
}
