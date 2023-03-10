import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { itemPost, itemGet } from '../../api/itemAxios/itemAxios'
const initialState = {
  loading: false,
  error: null,
  success: true,
  itemList: null,
  gettingItemLoading: false,
}
//getting item
export const gettingItem = createAsyncThunk('item/get', async (_, thunkAPI) => {
  return await itemGet(thunkAPI)
})
//posting item
export const addingItem = createAsyncThunk(
  'item/post',
  async (data, thunkAPI) => {
    return await itemPost(data, thunkAPI)
  },
)

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false
      state.error = null
      state.success = false
      state.gettingItemLoading = false
    },
  },
  extraReducers(builder) {
    builder.addCase(addingItem.pending, (state) => {
      state.loading = true
      state.error = null
      state.success = false
    })
    builder.addCase(addingItem.fulfilled, (state) => {
      state.loading = false
      state.error = null
      state.success = true
    })
    builder.addCase(gettingItem.pending, (state) => {
      state.loading = true
      state.error = null
      state.success = false
      state.gettingItemLoading = true
    })
    builder.addCase(gettingItem.fulfilled, (state, { payload }) => {
      state.loading = false
      state.error = null
      state.success = true
      state.itemList = payload
      state.gettingItemLoading = false
    })
  },
})

export default itemSlice.reducer
export const { resetState } = itemSlice.actions
