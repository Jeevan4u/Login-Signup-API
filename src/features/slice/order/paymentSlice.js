import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { paymentPost } from "../../api/orderAxios/paymentAxios";
const initialState = {
  loading: false,
  error: null,
  success: true,
  paymentSuccess: false,
  paymentData: null,
};

export const paying = createAsyncThunk(
  "payment/post",
  async (data, thunkAPI) => {
    return await paymentPost(data, thunkAPI);
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.paymentSuccess = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(paying.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
      state.paymentSuccess = false;
    });
    builder.addCase(paying.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.error = null;
      state.success = true;
      state.paymentSuccess = true;
      state.paymentData = payload;
    });
  },
});

export default paymentSlice.reducer;
export const { resetState } = paymentSlice.actions;
