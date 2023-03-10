import React from 'react'

export default function MiniCard({ cardData }) {
  return (
    <div className="p-[16px] bg-[#f7941d] rounded-md w-full ">
      <h3 className=" text-[12px] text-white">BOOKED TABLE</h3>
      <h2 className="text-[18px] font-semibold text-white mb-1">
        {cardData.tableNo}
      </h2>
      <p className="text-white text-[8px]">TOTAL BUSINESS</p>
      <p className="text-white text-[10px] font-medium">
        {cardData.totalBussiness}
      </p>
    </div>
  )
}
