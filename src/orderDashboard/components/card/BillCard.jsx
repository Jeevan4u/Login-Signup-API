import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { PrintInvoice } from "../../../Components/Card/PrintInvoice";
import Print from "../../../Components/Print/Print";
import ReactToPrint from "react-to-print";

import { paying } from "../../../features/slice/order/paymentSlice";
import { useSelector, useDispatch } from "react-redux";
import { resetState } from "../../../features/slice/order/paymentSlice";
export default function BillCard({
  orderId,
  setActiveBillCardAfter,
  setActiveBill,
  setPrintModelShow,
  totalPriceWithoutTax,
  tableNo,
  totalWithTax,
  orderItemList,
  orderItemQuantity,
  filterItemCash,
  setTotalAmount,
}) {
  // const handleBillClickAdd = (e) => {
  //   e.preventDefault();
  //   setActiveBill(false);
  //   setActiveBillCardAfter(true);
  // };
  const [discount, setDiscount] = useState(0);
  const dispatch = useDispatch();
  const { loading, paymentSuccess } = useSelector((state) => state.payment);

  const selectedItem = (
    <>
      {orderItemList.map((item, index) => (
        <p key={index}>
          {index + 1}. {item.label} X {orderItemQuantity[`${item.value}`]} :{" "}
          {filterItemCash(item.value) *
            Number(orderItemQuantity[`${item.value}`])}
        </p>
      ))}
    </>
  );

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      discountType: "1",
    },
  });

  useEffect(() => {
    if (Number(watch().discountType) === 1) {
      setDiscount(Number(totalWithTax) * (Number(watch()?.discount) / 100));
    } else {
      setDiscount(Number(watch()?.discount));
    }
  }, [watch().discountType, watch()?.discount]);

  const onSubmit = (data) => {
    dispatch(
      paying({
        type: data.paymentType.value,
        ...(parseInt(data.paymentType.value) === 1 && {
          option: data.onlineOption,
        }),
        amount: totalPriceWithoutTax,
        ...(data.service_charge && { service_charge: data.service_charge }),
        ...(data.discount && { discount: data.discount }),
        ...(data.tax && { tax: data.tax }),
        total_amount: totalWithTax - discount,
        order_id: orderId,
      })
    );
    setTotalAmount(totalWithTax - discount);
  };

  useEffect(() => {
    if (paymentSuccess) {
      toast("Payment Successful");
      setPrintModelShow(true);
      setActiveBill(false);
      setActiveBillCardAfter(false);
      // dispatch(resetState());
    }
  }, [paymentSuccess]);
  // console.log(printModelShow);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="font-medium mb-[16px]">TABLE NO. : {tableNo}</h2>
        <div className="item mb-[16px]">{selectedItem}</div>
        <div className="cost mb-[16px]">
          <p>TOTAL : {totalPriceWithoutTax}</p>
          <div className="flex items-center gap-4">
            <label>SERVICE CHAGER</label>
            <input
              type="number"
              defaultValue={0}
              className="hidden bg-white h-[40px]  px-4 items-center text-[12px] border-[#e1e2e3] border-2 border-spacing-1 focus-visible:border-[#e1e2e3]"
              {...register(`service_charge`)}
            />
          </div>
          <div className="flex items-center gap-4">
            <label>13% TAX</label>
            <input
              type="number"
              defaultValue={13}
              className="hidden bg-white h-[40px]  px-4 items-center text-[12px] border-[#e1e2e3] border-2 border-spacing-1 focus-visible:border-[#e1e2e3]"
              {...register(`tax`)}
            />
          </div>
        </div>
        <h2 className="font-medium  mb-[16px]">TOTAL AMOUNT :{totalWithTax}</h2>
        <div className="flex  mb-[8px] gap-4">
          <div className="flex items-center gap-4">
            <label>DISCOUNT :</label>
            <input
              type="number"
              defaultValue={0}
              className="bg-white h-[40px]  px-4 flex items-center text-[12px] border-[#e1e2e3] border-2 border-spacing-1 focus-visible:border-[#e1e2e3]"
              {...register(`discount`)}
            />
          </div>
          <div className="radio-container  pt-[20px]">
            <div className="input-container flex gap-2">
              <input
                type="radio"
                id="discountRadio1"
                value="1"
                {...register(`discountType`)}
              />
              <label htmlFor="discountRadio1">PERCENT</label>
            </div>
            <div className="input-container flex gap-2">
              <input
                type="radio"
                id="discountRadio2"
                value="2"
                {...register(`discountType`)}
              />
              <label htmlFor="discountRadio2">AMOUNT</label>
            </div>
          </div>
        </div>
        <h2 className="font-medium  mb-[16px]">DISCOUNT : {discount}</h2>
        <h2 className="font-medium  mb-[8px]">
          NET AMOUNT : {totalWithTax - discount}
        </h2>
        <div className="mb-[8px]">
          <h2 className="font-medium  mb-[4px]">PAYMENT TYPE</h2>
          <Controller
            name="paymentType"
            control={control}
            rules={{
              required: "Table number is required",
              minLength: {
                value: 1,
                message: "Min character length required",
              },
              maxLength: {
                value: 99,
                message: "Max character length exceded",
              },
            }}
            render={({ field }) => (
              <Select
                // Placeholder="please selecct"
                options={[
                  { label: "Online", value: "1" },
                  { label: "Voucher", value: "2" },
                  { label: "Cash", value: "3" },
                ]}
                {...field}
                placeholder="Select Payment Type"
              />
            )}
          />
        </div>
        {watch()?.paymentType?.value === "1" && (
          <div className="inputContainer mb-[12px] ">
            <label className="font-medium  mb-[4px] ">
              ONLINE PAYMENT OPTION
            </label>
            <div className="flex items-center gap-4 py-2">
              <div className="flex items-center  ">
                <input
                  id="onlineOption1"
                  type="radio"
                  value="1"
                  name="disabled-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  cursor-pointer"
                  {...register(`onlineOption`, { required: true })}
                />
                <label
                  htmlFor="onlineOption1"
                  className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500 cursor-pointer"
                >
                  Bank Transfer
                </label>
              </div>
              <div className="flex items-center ">
                <input
                  id="onlineOption2"
                  type="radio"
                  value="2"
                  name="disabled-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  cursor-pointer"
                  {...register(`onlineOption`, { required: true })}
                />
                <label
                  htmlFor="onlineOption2"
                  className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500 cursor-pointer"
                >
                  Esewa
                </label>
              </div>
              <div className="flex items-center ">
                <input
                  id="onlineOption3"
                  type="radio"
                  value="3"
                  name="disabled-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  cursor-pointer"
                  {...register(`onlineOption`, { required: true })}
                />
                <label
                  htmlFor="onlineOption3"
                  className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500 cursor-pointer"
                >
                  Khalti
                </label>
              </div>
            </div>
          </div>
        )}
        {/* <input
        type="number"
        className=" mb-[8px] bg-white h-[40px] w-full px-4 flex items-center text-[12px] border-[#e1e2e3] border-2 border-spacing-1 focus-visible:border-[#e1e2e3]"
        placeholder="INSERT MOBILE NUMBER FOR PRIVILLAGE POINT"
      /> */}
        <button className="mt-4 bg-green-600 flex items-center justify-center  text-white w-full h-[50px] cursor-pointer">
          Make Payment
        </button>
      </form>
    </>
  );
}
