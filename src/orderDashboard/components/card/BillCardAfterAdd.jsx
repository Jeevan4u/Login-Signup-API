import React from "react";

export default function BillCardAfterAdd() {
  return (
    <form>
      <h2 className="font-medium mb-[16px]">TABLE NO. : 08</h2>
      <div className="item mb-[16px]">
        <p>1. MOMO STEAM BUFF X 1 : 250</p>
        <p>2. COFFEE AMERICANO X 1 : 175</p>
      </div>
      <div className="cost mb-[16px]">
        <p>TOTAL : 425</p>
        <p>10% SERVICE CHAGER : NIL</p>
        <p>13% TAX : NIL</p>
      </div>
      <h2 className="font-medium  mb-[16px]">TOTAL AMOUNT : 425.00</h2>
      <div className="flex  mb-[8px] gap-4">
        <div className="flex items-center gap-4">
          <label>DISCOUNT :</label>
          <input
            type="number"
            className="bg-white h-[40px]  px-4 flex items-center text-[12px] border-[#e1e2e3] border-2 border-spacing-1 focus-visible:border-[#e1e2e3]"
          />
        </div>
        <div className="radio-container  pt-[20px]">
          <div className="input-container flex gap-2">
            <input type="radio" />
            <label>PERCENT</label>
          </div>
          <div className="input-container flex gap-2">
            <input type="radio" />
            <label>AMOUNT</label>
          </div>
        </div>
      </div>
      <h2 className="font-medium  mb-[16px]">DISCOUNT : 42.50</h2>
      <h2 className="font-medium  mb-[32px]">NET AMOUNT : 382.50</h2>

      <div className="btn-container flex gap-4 flex-wrap">
        <button className="btn-secondary">EDIT</button>
        <button className="  mb-[16px] bg-[#ed1c24] flex items-center justify-center  text-white w-[200px] h-[50px]">
          PRINT
        </button>
      </div>
    </form>
  );
}
