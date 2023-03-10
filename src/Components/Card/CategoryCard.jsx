import React from 'react'

export default function CategoryCard({ cardData }) {
  return (
    <div className="p-[16px] bg-[#39b54a] rounded-md w-full flex justify-between hover:scale-110 cursor-pointer">
      <div>
        <h3 className=" text-[12px] text-white">{cardData.title}</h3>
        <p className="text-white text-[8px]">{cardData.description}</p>
      </div>
      <div className="img w-[80px]">
        <img src={cardData.img} alt="" />
      </div>
    </div>
  )
}
