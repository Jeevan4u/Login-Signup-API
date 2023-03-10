import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/auth/authSlice'
import categorySlice from './slice/category/categorySlice'
import itemSlice from './slice/item/itemSlice'
import tableSlice from './slice/tableSlice/tableSlice'
import orderSlice from './slice/order/orderSlice'
import paymentSlice from './slice/order/paymentSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categorySlice,
    item: itemSlice,
    table: tableSlice,
    order: orderSlice,
    payment: paymentSlice,
  },
})
