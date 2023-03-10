import React, { useEffect } from 'react'
import Table from '../../../Components/Table/Table'
import SmallCard from '../../../Components/Card/SmallCard'
import { useParams } from 'react-router-dom'
import AddTableForm from '../../components/form/table/AddTableForm'
import { useSelector, useDispatch } from 'react-redux'
import { gettingTable } from '../../../features/slice/tableSlice/tableSlice'
import Loader from '../../../Components/Loader'
import { resetState } from '../../../features/slice/tableSlice/tableSlice'
export default function TablePage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const {
    loading,
    error,
    success,
    mainCategoryList,
    subCategoryList,
  } = useSelector((state) => state.category)
  const { gettingTableSuccess, tableData, postingTableSuccess } = useSelector(
    (state) => state.table,
  )
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
    { accessor: 'auto', label: 'SNO' },
    { accessor: 'name', label: 'TABLE NAME' },
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
    buttonName: 'ADD TABLE',
    buttonLink: './addTable',
    searchAccessor: 'title',
  }
  useEffect(() => {
    dispatch(gettingTable())
    dispatch(resetState())
  }, [postingTableSuccess])
  if (!tableData) {
    return <Loader />
  }
  console.log(tableData)
  return (
    <>
      <div className="col-span-3">
        <div className="shadow-box  pt-[40px]">
          {mainCategoryList && (
            <>
              {id === 'addTable' ? (
                <AddTableForm
                  columns={columns}
                  rows={mainCategoryList}
                  additionalTableData={additionalTableData}
                />
              ) : (
                <Table
                  columns={columns}
                  rows={tableData}
                  additionalTableData={additionalTableData}
                />
              )}
            </>
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
