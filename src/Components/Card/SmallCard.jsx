import React from 'react'

export default function SmallCard({ card }) {
  return (
    <>
      <div
        className={`flex flex-col  justify-between p-[20px]  rounded-lg h-full  ${
          card.hasOwnProperty('bgColor') ? `${card.bgColor}` : 'bg-white'
        }`}
      >
        <h3
          className={` ${
            card.hasOwnProperty('color') ? `${card.color}` : 'text-[#7d94a8]'
          }`}
        >
          {card.title}
        </h3>
        {card.hasOwnProperty('additional') ? (
          <div className="flex justify-between ">
            <div className="flex items-center gap-2 ">
              <h3 className="text-[#7d94a8]">{card.additional.subTitle1}</h3>
              <h2 className="text-[28px] font-semibold text-[#414042]">
                {card.additional.subNumber1}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="text-[#7d94a8]">{card.additional.subTitle2}</h3>
              <h2 className="text-[28px] font-semibold text-[#414042]">
                {card.additional.subNumber2}
              </h2>
            </div>
          </div>
        ) : (
          <h2
            className={`text-[28px] font-semibold ${
              card.hasOwnProperty('color') ? `${card.color}` : 'text-[#414042]'
            }`}
          >
            {card.number}
          </h2>
        )}
      </div>
    </>
  )
}
