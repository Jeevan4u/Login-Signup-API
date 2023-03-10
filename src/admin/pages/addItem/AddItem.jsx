import React, { useEffect, useState } from 'react'
import SmallCard from '../../../Components/Card/SmallCard'
import AddItemForm from '../../components/form/addItemForm/AddItemForm'
import AddSubCategoryForm from '../../components/form/subCategory/AddSubCategoryForm'
import AddMainCategory from '../../components/form/mainCategory/AddMainCategoryForm'
import {
  mainCategoryGetting,
  subCategoryGetting,
} from '../../../features/slice/category/categorySlice'
import { useDispatch, useSelector } from 'react-redux'
import { addingItem } from '../../../features/slice/item/itemSlice'
export default function AddItem() {
  const dispatch = useDispatch()
  const {
    loading,
    error,
    success,
    mainCategoryList,
    subCategoryList,
  } = useSelector((state) => state.category)
  const [activeOption, setActiveOption] = useState('addItem')
  const smallCardData = [
    {
      title: 'TOTAL BOOKED',
      number: 8,
      bgColor: 'bg-[#f7941d]',
      color: 'text-white',
    },
    {
      title: 'VACANT TABLE',
      number: 22,
      bgColor: 'bg-[#39b54a]',
      color: 'text-white',
    },
    {
      title: 'SERVING',
      number: 10,
      bgColor: 'bg-[#bfe5e4]',
    },
    {
      title: 'COOKING',
      number: 12,
      bgColor: 'bg-[#bfe5e4]',
    },
    { title: 'QUE', number: 5, bgColor: 'bg-[#bfe5e4]' },
    {
      title: 'SERVED TODAY',
      number: 50,
      bgColor: 'bg-[#bfe5e4]',
    },
  ]

  return (
    <>
      <div className=" h-full flex flex-wrap gap-[20px] col-span-3  ">
        <div className="w-full">
          <div className="shadow-box">
            <div className="option flex gap-6 mb-[30px]">
              <div
                aria-current={activeOption === 'addItem' ? true : false}
                onClick={() => setActiveOption('addItem')}
                className="text-[#7d94a8] cursor-pointer aria-[current=true]:font-semibold "
              >
                ADD ITEM
              </div>
              <div
                aria-current={
                  activeOption === 'addMainCatagories' ? true : false
                }
                onClick={() => setActiveOption('addMainCatagories')}
                className="text-[#7d94a8] cursor-pointer aria-[current=true]:font-semibold"
              >
                ADD MAIN CATEGORY
              </div>
              <div
                aria-current={
                  activeOption === 'addSubCatagories' ? true : false
                }
                onClick={() => setActiveOption('addSubCatagories')}
                className="text-[#7d94a8] cursor-pointer aria-[current=true]:font-semibold"
              >
                ADD SUB CATEGORY
              </div>
            </div>
            {activeOption === 'addItem' && (
              <AddItemForm
                subCategoryList={subCategoryList}
                mainCategoryList={mainCategoryList}
              />
            )}
            {activeOption === 'addMainCatagories' && <AddMainCategory />}
            {activeOption === 'addSubCatagories' && <AddSubCategoryForm />}
          </div>
        </div>
      </div>
      <div className=" h-full col-span-1 ">
        {smallCardData.map((item, index) => (
          <div className="flex-grow  mb-[20px]" key={index}>
            <SmallCard card={item} />
          </div>
        ))}
      </div>
    </>
  )
}
