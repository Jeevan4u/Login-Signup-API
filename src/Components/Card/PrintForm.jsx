import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";

export const PrintForm = React.forwardRef((props, ref) => {
  <div
    ref={ref}
    className="col-span-1 bg-[#f2f3f3] w-full h-full border-[#e1e2e3] border-2 p-4"
  >
    <h2 className="text-center text-[#7d94a8] mb-[16px]">PRINT INVOICE</h2>

    <p className="text-[12px] font-medium mb-[8px]">
      TABLE NO. :{props.watch.table_id && props.watch.table_id.value}
    </p>
    {props.selectedItem}
    <p className="text-[12px] ">
      TOTAL :
      <span>{props.watch.item_id && <>{props.totalPriceWithoutTax}</>}</span>
    </p>
    <p className="text-[12px] ">10% SERVICE CHAGER : NIL</p>
    <p className="text-[12px] mb-[40px]">13% TAX : NIL</p>
    <p className="text-[12px] font-medium mb-[8px]">
      TOTAL AMOUNT :<span>{props.totalAmount}</span>
    </p>
  </div>;
});
