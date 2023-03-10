import React, { useEffect } from 'react'
import Table from '../../../Components/Table/Table'
import SmallCard from '../../../Components/Card/SmallCard'
import AddItemForm from '../../components/form/addItemForm/AddItemForm'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { gettingItem } from '../../../features/slice/item/itemSlice'
import Loader from '../../../Components/Loader'
export default function Items() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { gettingItemLoading, itemList } = useSelector((state) => state.item)

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
    { accessor: 'code', label: 'CODE' },
    { accessor: 'title', label: 'ITEMS' },
    // { accessor: 'mainCategory', label: 'MAIN CATEGORY' },
    // { accessor: 'subCategory', label: 'SUB CATEGORY' },
    { accessor: 'price', label: 'PRICE', bold: true },
    // { accessor: 'stock', label: 'STOCK', bold: true },
    { accessor: 'action', label: 'ACTION' },
  ]
  const rows = [
    {
      code: '02301',
      items: 'MEGICAL BURGER BUFF',
      mainCategory: 'SPECIAL',
      subCategory: 'MY SPECIAL',
      price: '650',
      stock: '10 left',
    },
    {
      code: '02301',
      items: 'sdfsdaf BURGER BUFF',
      mainCategory: 'SPECIAL',
      subCategory: 'MY SPECIAL',
      price: '650',
      stock: '10 left',
    },
    {
      code: '02301',
      items: 'kdsfldjsfkdjl BURGER BUFF',
      mainCategory: 'SPECIAL',
      subCategory: 'MY SPECIAL',
      price: '650',
      stock: '10 left',
    },
    {
      code: '02301',
      items: 'hello BURGER BUFF',
      mainCategory: 'SPECIAL',
      subCategory: 'MY SPECIAL',
      price: '650',
      stock: '10 left',
    },
    {
      code: '02301',
      items: 'afdafdf BURGER BUFF',
      mainCategory: 'SPECIAL',
      subCategory: 'MY SPECIAL',
      price: '650',
      stock: '10 left',
    },
    {
      code: '02301',
      items: 'MEGICAL BURGER BUFF',
      mainCategory: 'SPECIAL',
      subCategory: 'MY SPECIAL',
      price: '650',
      stock: '10 left',
    },
    {
      code: '02301',
      items: 'MEGICAL BURGER BUFF',
      mainCategory: 'SPECIAL',
      subCategory: 'MY SPECIAL',
      price: '650',
      stock: '10 left',
    },
    {
      code: '02301',
      items: 'MEGICAL BURGER BUFF',
      mainCategory: 'SPECIAL',
      subCategory: 'MY SPECIAL',
      price: '650',
      stock: '10 left',
    },
    {
      code: '02301',
      items: 'MEGICAL BURGER BUFF',
      mainCategory: 'SPECIAL',
      subCategory: 'MY SPECIAL',
      price: '650',
      stock: '10 left',
    },
    {
      code: '02301',
      items: 'MEGICAL BURGER BUFF',
      mainCategory: 'SPECIAL',
      subCategory: 'MY SPECIAL',
      price: '650',
      stock: '10 left',
    },
  ]
  const additionalTableData = {
    buttonName: 'ADD ITEMS',
    buttonLink: '/admin/items/addItems',
    searchAccessor: 'title',
  }
  useEffect(() => {
    dispatch(gettingItem())
  }, [])
  if (!itemList) {
    return <Loader />
  }
  console.log(itemList)
  return (
    <>
      <div className=" col-span-3 ">
        <div className="pt-[40px] shadow-box">
          {id === 'addItems' ? (
            <>
              <h2 className="text-[#7d94a8] cursor-pointer aria-[current=true]:font-semibold text-[16px]">
                Add Sub Categories
              </h2>
              <AddItemForm />
            </>
          ) : (
            <Table
              columns={columns}
              rows={itemList}
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
