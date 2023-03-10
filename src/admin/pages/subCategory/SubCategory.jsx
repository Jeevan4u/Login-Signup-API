import React from 'react'
import Table from '../../../Components/Table/Table'
import SmallCard from '../../../Components/Card/SmallCard'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import AddSubCategoryForm from '../../components/form/subCategory/AddSubCategoryForm'
export default function SubCategory() {
  const { id } = useParams()
  const { subCategoryList, success } = useSelector((state) => state.category)
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

  const columns = [
    { accessor: 'id', label: 'SNO' },

    { accessor: 'title', label: 'MAIN CATEGORY NAME' },

    { accessor: 'action', label: 'ACTION' },
  ]
  const rows = [
    {
      sn: '1',
      items: 'MEGICAL BURGER BUFF',
      mainCategory: 'MOMO',
      subCategory: 'MY SPECIAL',
      price: '650',
      stock: '10 left',
    },
    {
      sn: '2',
      items: 'MEGICAL BURGER BUFF',
      mainCategory: 'NEPALI SET',
      subCategory: 'MY SPECIAL',
      price: '650',
      stock: '10 left',
    },
    {
      sn: '3',
      items: 'MEGICAL BURGER BUFF',
      mainCategory: 'BURGER',
      subCategory: 'MY SPECIAL',
      price: '650',
      stock: '10 left',
    },
    {
      sn: '4',
      items: 'MEGICAL BURGER BUFF',
      mainCategory: 'SPECIAL',
      subCategory: 'MY SPECIAL',
      price: '650',
      stock: '10 left',
    },
    {
      sn: '5',
      items: 'MEGICAL BURGER BUFF',
      mainCategory: 'SPECIAL',
      subCategory: 'MY SPECIAL',
      price: '650',
      stock: '10 left',
    },
    {
      sn: '6',
      items: 'MEGICAL BURGER BUFF',
      mainCategory: 'SPECIAL',
      subCategory: 'MY SPECIAL',
      price: '650',
      stock: '10 left',
    },
    {
      sn: '7',
      items: 'MEGICAL BURGER BUFF',
      mainCategory: 'SPECIAL',
      subCategory: 'MY SPECIAL',
      price: '650',
      stock: '10 left',
    },
    {
      sn: '8',
      items: 'MEGICAL BURGER BUFF',
      mainCategory: 'SPECIAL',
      subCategory: 'MY SPECIAL',
      price: '650',
      stock: '10 left',
    },
    {
      sn: '9',
      items: 'MEGICAL BURGER BUFF',
      mainCategory: 'SPECIAL',
      subCategory: 'MY SPECIAL',
      price: '650',
      stock: '10 left',
    },
    {
      sn: '10',
      items: 'MEGICAL BURGER BUFF',
      mainCategory: 'SPECIAL',
      subCategory: 'MY SPECIAL',
      price: '650',
      stock: '10 left',
    },
  ]

  const additionalTableData = {
    buttonName: 'ADD SUB CATEGORY',
    buttonLink: '/admin/subCategory/addSubCategory',
  }
  return (
    <>
      <div className="col-span-3 ">
        <div className="shadow-box pt-[40px]">
          {id === 'addSubCategory' ? (
            <>
              <h2 className="text-[#7d94a8] cursor-pointer aria-[current=true]:font-semibold text-[16px]">
                Add Sub Categories
              </h2>
              <AddSubCategoryForm />
            </>
          ) : (
            <Table
              columns={columns}
              rows={subCategoryList}
              additionalTableData={additionalTableData}
            />
          )}
        </div>
      </div>
      <div className=" h-full col-span-1 ">
        {smallCardData.map((item) => (
          <div className="flex-grow  mb-[20px]">
            <SmallCard card={item} />
          </div>
        ))}
      </div>
    </>
  )
}
