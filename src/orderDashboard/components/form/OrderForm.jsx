import React, { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import BillCard from '../card/BillCard'
import BillCardAfterAdd from '../card/BillCardAfterAdd'
import Select from 'react-select'
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../../../Components/Loader'
import {
  addingOrder,
  resetState,
} from '../../../features/slice/order/orderSlice'
import { useDispatch } from 'react-redux'
import { PrintInvoice } from '../../../Components/Card/PrintInvoice'

const OrderForm = () => {
  const dispatch = useDispatch()
  const { tableId } = useParams()
  const [tableDefaultValue, setTableDefaultValue] = useState(null)
  const [activeBill, setActiveBill] = useState(false)
  const [printModelShow, setPrintModelShow] = useState(false)
  const [activeBillCardAfter, setActiveBillCardAfter] = useState(false)
  const [totalAmount, setTotalAmount] = useState('')

  const { tableData } = useSelector((state) => state.table)
  const { itemList } = useSelector((state) => state.item)
  const { loading, orderSuccess, orderData } = useSelector(
    (state) => state.order,
  )
  const { paymentData, paymentSuccess } = useSelector((state) => state.payment)
  if (!itemList && !tableData) {
    return <Loader />
  }
  console.log(tableData)

  const tableOption = tableData?.map((item) => {
    const { id, name } = item
    return { value: id, label: name }
  })
  const defaultOptionTable = tableOption?.find(
    (option) => option.value === Number(tableId),
  )
  console.log(defaultOptionTable)
  const itemOption = itemList?.map((item) => {
    const { id, title } = item
    return { value: id, label: title }
  })

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      item_id: {},
    },
  })
  const closePopup = () => {
    setActiveBill(false)
    setActiveBillCardAfter(false)
  }

  console.log(paymentSuccess && paymentData)

  useEffect(() => {
    if (orderSuccess) {
      toast('Your order has been added')
      // reset()
      setActiveBill(true)
      dispatch(resetState())
      // console.log(watch());
      // console.log(orderData);
    }
  }, [orderSuccess])

  const onSubmit = ({ table_id, item_id, type }) => {
    // console.log(table_id, item_id, type);
    const formData = new FormData()
    formData.append('table_id', table_id.value)
    formData.append('type', type)
    let index = 0
    for (const [key, value] of Object.entries(item_id)) {
      // console.log(`${key}: ${value}`);
      formData.append(`items[${index}][id]`, key)
      formData.append(`items[${index}][quantity]`, value)
      index++
    }

    dispatch(addingOrder(formData))
  }

  const filterItemCash = (itemId) => {
    // console.log(itemId, 'i am inside function', itemList)
    const selectedItem = itemList.filter((item) => item.id === Number(itemId))
    // console.log(selectedItem[0].price, 'selectedItem', selectedItem)
    return selectedItem[0].price
  }

  function totalPriceWithoutTax() {
    var totalPrice = 0
    for (const [key, value] of Object.entries(watch().item_id)) {
      if (!value) {
        totalPrice = filterItemCash(key) * 0 + totalPrice
      } else {
        totalPrice = filterItemCash(key) * value + totalPrice
      }
    }
    return totalPrice
  }

  const selectedItem = (
    <div className="mb-[8px]">
      {watch().items &&
        watch().items.map((item, index) => (
          <p className="text-[12px]" key={index}>
            {index + 1}. {item.label} : {filterItemCash(item.value)} X{' '}
            {watch().item_id && watch().item_id[`${item.value}`]} :{' '}
            {watch().item_id &&
              filterItemCash(item.value) *
                Number(watch().item_id[`${item.value}`])}
          </p>
        ))}
    </div>
  )
  // useEffect(() => {
  //   if (tableId && tableOption) {
  //     const newDefault = tableOption
  //       .slice()
  //       .filter((item) => item.value === Number(tableId))
  //     console.log(newDefault)
  //     setTableDefaultValue(newDefault[0])
  //     console.log(tableDefaultValue)
  //   }
  // }, [tableId, tableOption])
  console.log(
    watch(),
    tableOption?.filter((item) => item.value === Number(tableId))[0],
  )
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className=" text-[#7d94a8] mb-[24px]">ORDER</h2>
        <div className="grid grid-cols-4 gap-4 mb-[60px]">
          <div className="col-span-3 flex flex-col justify-between">
            <div>
              <div className="inputContainer mb-[12px] grid grid-cols-4 gap-2">
                <div className="col-span-1 flex items-center">
                  <label className="text-[14px] ">TABLE NO</label>
                </div>
                <div className="col-span-3 ">
                  {/* <input
                    type="text"
                    className="custom-input"
                    placeholder="SELECT BOOKED TABLE"
                  /> */}
                  <Controller
                    name="table_id"
                    control={control}
                    defaultValue={
                      tableId && {
                        label: tableOption?.filter(
                          (item) => item.value == Number(tableId),
                        )[0].label,
                        value: Number(tableId),
                      }
                    }
                    rules={{
                      required: 'Table number is required',
                      minLength: {
                        value: 1,
                        message: 'Min character length required',
                      },
                      maxLength: {
                        value: 99,
                        message: 'Max character length exceded',
                      },
                    }}
                    render={({ field }) => (
                      <Select
                        // Placeholder="please selecct".
                        defaultValue={defaultOptionTable}
                        options={tableOption}
                        {...field}
                        placeholder="Select a Table"
                      />
                    )}
                  />
                </div>
              </div>
              <div className="inputContainer mb-[12px] grid grid-cols-4 gap-2">
                <div className="col-span-1 flex items-center">
                  <label className="text-[14px] ">ITEM</label>
                </div>
                <div className="col-span-3 ">
                  <Controller
                    name="items"
                    control={control}
                    rules={{
                      required: 'Item number is required',
                      minLength: {
                        value: 1,
                        message: 'Min character length required',
                      },
                      maxLength: {
                        value: 99,
                        message: 'Max character length exceded',
                      },
                    }}
                    render={({ field }) => (
                      <Select
                        Placeholder
                        closeMenuOnSelect={false}
                        options={itemOption}
                        {...field}
                        placeholder="Select a Item"
                        isMulti
                      />
                    )}
                  />
                </div>
              </div>
              {watch().items && (
                <div className="inputContainer mb-[12px] grid grid-cols-4 gap-2">
                  <div className="col-span-1 flex items-center"></div>
                  <div className="col-span-3 flex gap-6 flex-wrap gap-y-1">
                    {watch().items.map((item, index) => (
                      <div
                        className="relative  flex border-gray-300 border py-[8px] h-[40px] flex-wrap"
                        key={index}
                      >
                        <label className=" inset-y-0 left-0 flex items-center px-3 pointer-events-none ">
                          <div>{item.label}</div>
                        </label>
                        <div>
                          <input
                            type="number"
                            id="input-group-1"
                            defaultValue={1}
                            className=" w-[60px] text-sm block pl-2  text-black border-l border-l-[#cccccc] h-full focus-visible:outline-0"
                            {...register(`item_id.${item.value}`, {
                              required: true,
                            })}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="inputContainer mb-[12px] grid grid-cols-4 gap-2">
                <div className="col-span-1 flex items-center">
                  <label className="text-[14px] ">Type</label>
                </div>
                <div className="col-span-3 ">
                  <div className="flex items-center gap-4 py-2">
                    <div className="flex items-center ">
                      <input
                        id="disabled-radio-1"
                        type="radio"
                        value="2"
                        name="disabled-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  "
                        {...register(`type`, { required: true })}
                      />
                      <label
                        htmlFor="disabled-radio-1"
                        className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500"
                      >
                        One by One
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="disabled-radio-2"
                        type="radio"
                        value="1"
                        name="disabled-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  "
                        {...register(`type`, { required: true })}
                      />
                      <label
                        htmlFor="disabled-radio-2"
                        className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500"
                      >
                        all-together
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="inputContainer my-[12px] grid grid-cols-4 gap-2  place-items-end">
              <div className="col-span-1"></div>
              <div className="col-span-3 ">
                <div className="flex ml-auto justify-end gap-4 flex-wrap">
                  <button className="btn-secondary" disabled={loading}>
                    Pay Later
                  </button>
                  <button className="btn-primary" disabled={loading}>
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 bg-[#f2f3f3] w-full h-full border-[#e1e2e3] border-2 p-4">
            <h2 className="text-center text-[#7d94a8] mb-[16px]">
              PRINT INVOICE
            </h2>

            <p className="text-[12px] font-medium mb-[8px]">
              TABLE NO. :{watch().table_id && watch().table_id.value}
            </p>
            {selectedItem}
            <p className="text-[12px] ">
              TOTAL :
              <span>{watch().item_id && <>{totalPriceWithoutTax()}</>}</span>
            </p>
            <p className="text-[12px] ">10% SERVICE CHAGER : NIL</p>
            <p className="text-[12px] mb-[40px]">13% TAX : NIL</p>
            <p className="text-[12px] font-medium mb-[8px]">
              TOTAL AMOUNT :
              <span>{watch().item_id && <>{totalPriceWithoutTax()}</>}</span>
            </p>
          </div>
        </div>
      </form>
      {(activeBill || activeBillCardAfter) && (
        <div
          className="overflow fixed w-full h-[100vh]  top-0 left-0 flex justify-center items-center"
          onClick={closePopup}
        >
          <div
            className="opacity-[1] border-4 rounded-xl p-[40px] border-[#ed1c24] bg-[#f2f2f2]"
            onClick={(e) => e.stopPropagation()}
          >
            {activeBill && (
              <BillCard
                setActiveBillCardAfter={setActiveBillCardAfter}
                setActiveBill={setActiveBill}
                totalPriceWithoutTax={totalPriceWithoutTax()}
                totalWithTax={totalPriceWithoutTax()}
                tableNo={watch().table_id.value}
                orderItemList={watch().items}
                orderItemQuantity={watch().item_id}
                filterItemCash={filterItemCash}
                orderId={orderData.id}
                setPrintModelShow={setPrintModelShow}
                setTotalAmount={setTotalAmount}
              />
            )}
            {activeBillCardAfter && <BillCardAfterAdd />}
          </div>
        </div>
      )}
      {printModelShow && paymentSuccess && (
        <div className="overflow fixed w-full h-[100vh]  top-0 left-0 flex justify-center items-center">
          <div className="opacity-[1] h-[400px] w-[370px] border-4 rounded-xl p-[10px] pb-[30px] bg-[#f2f2f2]">
            <PrintInvoice
              watch={watch()}
              totalPriceWithoutTax={totalPriceWithoutTax()}
              totalAmount={totalAmount}
              selectedItem={selectedItem}
              paymentData={paymentData}
              reset={reset}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default OrderForm
