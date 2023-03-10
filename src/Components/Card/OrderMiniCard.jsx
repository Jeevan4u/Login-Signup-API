import React from "react";
import { useNavigate } from "react-router-dom";
export default function OrderMiniCard({
  cardData,
  vacant,
  allTableData,
  setTableId,
}) {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`p-[16px]  rounded-md w-full flex justify-between ${
          vacant ? "bg-[#39b54a]" : "bg-[#f7941d]"
        }`}
      >
        <div>
          <h3 className=" text-[12px] text-white">
            {vacant ? "VACANT TABLE" : "BOOKED TABLE"}
          </h3>
          <h2 className="text-[18px] font-semibold text-white mb-1">
            {cardData.tableName}
          </h2>

          {/* <p className="text-white text-[10px] font-medium">
        {cardData.totalBussiness}
      </p> */}
        </div>
        {vacant ? (
          <div className="flex items-center ">
            <button
              className="text-white"
              onClick={() =>
                navigate(`/orderDashboard/order/${allTableData.id}`)
              }
            >
              Order Now
            </button>
          </div>
        ) : (
          <div className="flex items-center ">
            <button
              className="text-white"
              onClick={() => setTableId(cardData.id)}
            >
              Pay Now
            </button>
          </div>
        )}
      </div>
    </>
  );
}
