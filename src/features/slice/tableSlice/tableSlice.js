import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { tableGet, tablePost } from '../../api/tableAxios/tableAxios'
const initialState = {
  loading: false,
  error: null,
  success: true,
  tableData: null,
  gettingTableSuccess: false,
  postingTableSuccess: false,
  postingTableLoading: false,
}

export const addingTable = createAsyncThunk(
  'table/post',
  async (data, thunkAPI) => {
    return await tablePost(data, thunkAPI)
  },
)
export const gettingTable = createAsyncThunk(
  'table/get',
  async (_, thunkAPI) => {
    return await tableGet(thunkAPI)
  },
)

const tableSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false
      state.error = null
      state.success = false
      state.gettingTableSuccess = false
      state.postingTableSuccess = false
      state.postingTableLoading = false
    },
  },
  extraReducers(builder) {
    builder.addCase(addingTable.pending, (state) => {
      state.loading = true
      state.error = null
      state.success = false
      state.postingTableSuccess = false
      state.postingTableLoading = true
    })
    builder.addCase(addingTable.fulfilled, (state) => {
      state.loading = false
      state.error = null
      state.success = true
      state.postingTableSuccess = true
      state.postingTableLoading = false
    })
    builder.addCase(gettingTable.pending, (state) => {
      state.loading = true
      state.error = null
      state.success = false
      state.gettingTableSuccess = false
    })
    builder.addCase(gettingTable.fulfilled, (state, { payload }) => {
      state.loading = false
      state.error = null
      state.success = true
      state.tableData = payload
      state.gettingTableSuccess = true
    })
  },
})

export default tableSlice.reducer
export const { resetState } = tableSlice.actions
