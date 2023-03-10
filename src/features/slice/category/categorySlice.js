import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  mainCategoryPost,
  mainCategoryUpdate,
  mainCategoryGet,
  subCategoryPost,
  subCategoryGet,
} from '../../api/categoryAxios/categoryAxios'
const initialState = {
  loading: false,
  error: null,
  success: false,
  mainCategoryList: null,
  subCategoryList: null,
  gettingCategorySuccess: false,
  gettingCategorySuccess: false,
}
//getting main Category
export const mainCategoryGetting = createAsyncThunk(
  'mainCategory/get',
  async (_, thunkAPI) => {
    return await mainCategoryGet(thunkAPI)
  },
)
//posting main category
export const mainCategoryAdding = createAsyncThunk(
  'mainCategory/post',
  async (data, thunkAPI) => {
    return await mainCategoryPost(data, thunkAPI)
  },
)
//posting main category
export const mainCategoryUpdating = createAsyncThunk(
  'mainCategory/edit',
  async (data, thunkAPI) => {
    return await mainCategoryUpdate(data, thunkAPI)
  },
)
//getting sub category
export const subCategoryGetting = createAsyncThunk(
  'subCategory/get',
  async (_, thunkAPI) => {
    return await subCategoryGet(thunkAPI)
  },
)
//posting sub category
export const subCategoryAdding = createAsyncThunk(
  'subCategory/post',
  async (data, thunkAPI) => {
    return await subCategoryPost(data, thunkAPI)
  },
)

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false
      state.error = null
      state.success = false
      state.gettingCategorySuccess = false
    },
    resetMainCategory: (state) => {
      state.gettingCategorySuccess = false
    },
    resetState: (state) => {
      state.loading = false
      state.error = null
      state.success = false
      state.gettingCategorySuccess = false
    },
  },
  extraReducers(builder) {
    builder.addCase(mainCategoryAdding.pending, (state) => {
      state.loading = true
      state.error = null
      state.success = false
    })
    builder.addCase(mainCategoryAdding.fulfilled, (state) => {
      state.loading = false
      state.error = null
      state.success = true
    })
    builder.addCase(mainCategoryGetting.pending, (state) => {
      state.loading = true
      state.error = null
      state.success = false
    })
    builder.addCase(mainCategoryGetting.fulfilled, (state, { payload }) => {
      state.loading = false
      state.error = null
      state.success = true
      state.mainCategoryList = payload
      state.gettingCategorySuccess = true
    })
    builder.addCase(subCategoryAdding.pending, (state) => {
      state.loading = true
      state.error = null
      state.success = false
    })
    builder.addCase(subCategoryAdding.fulfilled, (state) => {
      state.loading = false
      state.error = null
      state.success = true
    })
    builder.addCase(subCategoryGetting.pending, (state) => {
      state.loading = true
      state.error = null
      state.success = false
    })
    builder.addCase(subCategoryGetting.fulfilled, (state, { payload }) => {
      state.loading = false
      state.error = null
      state.success = true
      state.subCategoryList = payload
    })
  },
})

export default categorySlice.reducer
export const { resetState, resetMainCategory } = categorySlice.actions
