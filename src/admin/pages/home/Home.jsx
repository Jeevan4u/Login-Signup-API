import React, { useEffect } from 'react'
import MiniCard from '../../../Components/Card/MiniCard'
import LineChartComponent from '../../../Components/Chart/LineChartComponent'
import SmallCard from '../../../Components/Card/SmallCard'
import CategoryCard from '../../../Components/Card/CategoryCard'
import tableBilling from '../../../assets/images/tableBillling.svg'
import homeDelivery from '../../../assets/images/homeDelivery.svg'
import takeAway from '../../../assets/images/takeAway.svg'
export default function Home() {
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
  const categoriesCard = {
    service: [
      {
        title: 'Table Billing',
        img: tableBilling,
        description: 'this is a discription',
      },
      {
        title: 'Token Billing',
        img: homeDelivery,
        description: 'this is a discription',
      },
      {
        title: 'Home Delivery Billing',
        img: takeAway,
        description: 'this is a discription',
      },
      {
        title: 'Take Away Billing',
        img: tableBilling,
        description: 'this is a discription',
      },
      {
        title: 'HomeDelivery Status',
        img: homeDelivery,
        description: 'this is a discription',
      },
      {
        title: 'DashBoard',
        img: takeAway,
        description: 'this is a discription',
      },
      {
        title: 'Add Menu Item',
        img: tableBilling,
        description: 'this is a discription',
      },
      {
        title: 'Sales Report',
        img: homeDelivery,
        description: 'this is a discription',
      },
    ],
    product: [
      {
        title: 'Add Stock Category',
        img: tableBilling,
        description: 'this is a discription',
      },
      {
        title: 'Add Supplier',
        img: homeDelivery,
        description: 'this is a discription',
      },
      {
        title: 'Add Stock Product',
        img: takeAway,
        description: 'this is a discription',
      },
      {
        title: 'Purchase Pay',
        img: tableBilling,
        description: 'this is a discription',
      },
      {
        title: 'Opening Stock',
        img: homeDelivery,
        description: 'this is a discription',
      },
      {
        title: 'Stock Transfer',
        img: takeAway,
        description: 'this is a discription',
      },
      {
        title: 'Purchase Form',
        img: tableBilling,
        description: 'this is a discription',
      },
      {
        title: 'Add Inhouse Unit',
        img: homeDelivery,
        description: 'this is a discription',
      },
    ],
  }

  return (
    <>
      <div className=" h-full col-span-3 ">
        <div className="grid grid-cols-8 gap-8">
          <div className="col-span-4 grid grid-cols-2  gap-[20px] mb-[20px]">
            {categoriesCard.service.map((item) => {
              return (
                <div className="col-span-1">
                  <CategoryCard cardData={item} />
                </div>
              )
            })}
          </div>
          <div className="col-span-4 grid grid-cols-2 gap-[20px] mb-[20px]">
            {categoriesCard.product.map((item) => {
              return (
                <div className="col-span-1">
                  <CategoryCard cardData={item} />
                </div>
              )
            })}
          </div>
        </div>
        <div className="grid-cols-5 grid gap-[20px] mb-[20px]">
          {miniCardData.map((item) => (
            <div className="col-span-1">
              <MiniCard cardData={item} />
            </div>
          ))}
        </div>
        <div className="w-full h-[300px] py-[20px]  px-[30px] shadow-box  mb-[20px]">
          <LineChartComponent />
        </div>
        <div className="w-full h-[300px] py-[20px]  px-[30px] shadow-box  mb-[20px]">
          <LineChartComponent />
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
