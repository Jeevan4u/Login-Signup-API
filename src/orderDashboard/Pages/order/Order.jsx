import React from 'react'
import SmallCard from '../../../Components/Card/SmallCard'
import OrderForm from '../../components/form/OrderForm'
export default function Order() {
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
      <div className=" col-span-3 ">
        <div className="pt-[40px] shadow-box">
          <OrderForm />
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
