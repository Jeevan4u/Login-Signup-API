import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { useDispatch } from "react-redux";

import { resetState } from "../../features/slice/order/paymentSlice";

export const PrintInvoice = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const componentRef = useRef();

  const onBeforeGetContentResolve = useRef(null);

  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("old boring text");

  const handleAfterPrint = useCallback(() => {
    console.log("`onAfterPrint` called");
    setTimeout(() => {
      dispatch(resetState());
      props.reset();
      navigate("/orderDashboard");
    }, 1000);
  }, []);

  const handleBeforePrint = useCallback(() => {
    console.log("`onBeforePrint` called");
  }, []);

  const handleOnBeforeGetContent = useCallback(() => {
    console.log("`onBeforeGetContent` called");
    setLoading(true);
    setText("Loading new text...");

    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve;

      setTimeout(() => {
        setLoading(false);
        setText("New, Updated Text!");
        resolve();
      }, 2000);
    });
  }, [setLoading, setText]);

  useEffect(() => {
    if (
      text === "New, Updated Text!" &&
      typeof onBeforeGetContentResolve.current === "function"
    ) {
      onBeforeGetContentResolve.current();
    }
  }, [onBeforeGetContentResolve.current, text]);

  const reactToPrintContent = useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const reactToPrintTrigger = useCallback(() => {
    // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
    // to the root node of the returned component as it will be overwritten.

    // Bad: the `onClick` here will be overwritten by `react-to-print`
    // return <button onClick={() => alert('This will not work')}>Print this out!</button>;

    // Good
    return (
      <button className="bg-green-600 w-full py-1 text-white mt-[10px] text-center flex justify-center items-center">
        Print
      </button>
    );
  }, []);

  return (
    <div className="col-span-1 bg-[#f2f3f3] w-full h-full border-[#e1e2e3] border-2 p-4 pb-12">
      <PrintForm
        watch={props.watch}
        totalAmount={props.totalAmount}
        totalPriceWithoutTax={props.totalPriceWithoutTax}
        selectedItem={props.selectedItem}
        paymentData={props.paymentData}
        ref={componentRef}
      />
      <ReactToPrint
        content={reactToPrintContent}
        documentTitle="AwesomeFileName"
        onAfterPrint={handleAfterPrint}
        onBeforeGetContent={handleOnBeforeGetContent}
        onBeforePrint={handleBeforePrint}
        removeAfterPrint
        trigger={reactToPrintTrigger}
      />
      {loading && <p className="indicator">onBeforeGetContent: Loading...</p>}
    </div>
  );
};

const PrintForm = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="col-span-1 bg-[#f2f3f3] w-full h-full p-4">
      <h2 className="text-center text-[#7d94a8] mb-[16px]">PRINT INVOICE</h2>
      <p className="text-[12px] font-medium mb-[8px]">
        TABLE NO. :{props.watch.table_id && props.watch.table_id.value}
      </p>
      {props.selectedItem}
      <br />
      <p className="text-[12px] ">
        TOTAL :<span>{props?.paymentData?.amount}</span>
      </p>
      <p className="text-[12px] ">
        10% SERVICE CHAGER : {props?.paymentData?.service_charge}
      </p>

      <p className="text-[12px]">13% TAX : {props?.paymentData?.tax}</p>
      <p className="text-[12px] mb-[40px]">
        DISCOUNT : {props?.paymentData?.discount}
      </p>
      <p className="text-[12px] font-medium mb-[8px] text-center">
        TOTAL AMOUNT :
        <span className="text-base text-semibold">
          {props?.paymentData?.total_amount}
        </span>
      </p>
      <p className="text-[12px] font-medium mb-[8px] text-center">
        Thank You. Please visit again!!
      </p>
      <b />
    </div>
  );
});
