import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { orderGet, orderPost } from "../../api/orderAxios/orderAxios";
const initialState = {
  loading: false,
  error: null,
  success: true,
  orderData: null,
  orderSuccess: false,
};

export const addingOrder = createAsyncThunk(
  "order/post",
  async (data, thunkAPI) => {
    return await orderPost(data, thunkAPI);
  }
);
export const gettingOrder = createAsyncThunk(
  "order/get",
  async (_, thunkAPI) => {
    return await orderGet(thunkAPI);
  }
);

const orderSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.orderSuccess = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(addingOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
      state.orderSuccess = false;
    });
    builder.addCase(addingOrder.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.orderSuccess = true;
      state.orderData = payload;
    });
    builder.addCase(gettingOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(gettingOrder.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.orderData = payload;
    });
  },
});

export default orderSlice.reducer;
export const { resetState } = orderSlice.actions;
