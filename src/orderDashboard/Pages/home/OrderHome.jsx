import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SmallCard from '../../../Components/Card/SmallCard'

import OrderMiniCard from '../../../Components/Card/OrderMiniCard'
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
export default function OrderHome() {
  const [tableId, setTableId] = useState()
  const { tableData } = useSelector((state) => state.table)
  const occupiedTableData = tableData?.filter(
    (item) => item.status === 'occupied',
  )
  const vacantTableData = tableData?.filter((item) => item.status === 'vacant')

  const miniCardData = [
    { tableNo: '001 -A', totalBussiness: '500.00' },
    { tableNo: '002 -A', totalBussiness: '500.00' },
    { tableNo: '003 -A', totalBussiness: '500.00' },
    { tableNo: '005 -A', totalBussiness: '500.00' },
    { tableNo: '037 -A', totalBussiness: '500.00' },
    { tableNo: '030 -A', totalBussiness: '500.00' },
    { tableNo: '058 -A', totalBussiness: '500.00' },
    { tableNo: '055 -A', totalBussiness: '500.00' },
  ]

  useEffect(() => {
    if (tableData) {
      tableData
    }
  }, [tableData])
  return (
    <>
      <div className=" col-span-3 ">
        <div className="pt-[40px] shadow-box">
          <h2 class=" text-[#7d94a8] mb-[24px]">Tables</h2>
          <div className="grid-cols-5 grid gap-[20px] mb-[20px]">
            {occupiedTableData?.map((item) => (
              <div className="col-span-2">
                <OrderMiniCard
                  cardData={{
                    tableNo: item.order?.table_id,
                    tableName: item.name,
                    totalBussiness: '',
                  }}
                  allTableData={item}
                  vacant={false}
                  setTableId={setTableId}
                />
              </div>
            ))}
          </div>
          <div className="grid-cols-5 grid gap-[20px] mb-[20px]">
            {vacantTableData?.map((item) => (
              <div className="col-span-2">
                <OrderMiniCard
                  cardData={{
                    tableNo: item.order?.table_id,
                    tableName: item.name,
                    totalBussiness: '',
                  }}
                  vacant={true}
                  allTableData={item}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className=" h-full col-span-1 ">
        {smallCardData?.map((item, index) => (
          <div className="flex-grow  mb-[20px]" key={index}>
            <SmallCard card={item} />
          </div>
        ))}
      </div>
    </>
  )
}
