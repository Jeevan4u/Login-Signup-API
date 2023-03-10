import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../api/axios'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
const initialState = {
  loading: false,
  userInfo: {}, // for user object
  userToken: Cookies.get('userToken') ? Cookies.get('userToken') : null, // for storing the JWT
  error: null,
  role: null,
  login: false,
  success: false, // for monitoring the registration process.
}
export const registerUser = createAsyncThunk('auth/register', async (data) => {
  const controller = new AbortController()
  try {
    const response = await axios.post('/register', data, {
      signal: controller.signal,
    })
    if (response) {
      toast('User Create Successfully')

      console.log(response)
    }
  } catch (error) {
    console.log(error)

    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message)
      toast(error.response.data.message)
    } else {
      return rejectWithValue(error.message)
      toast(error.message)
    }
  }
})
export const userLogin = createAsyncThunk('auth/login', async (data) => {
  const controller = new AbortController()
  try {
    const response = await axios.post('/login', data, {
      signal: controller.signal,
    })
    return response.data
  } catch (error) {
    console.log(error)

    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message)
      toast(error.response.data.message)
    } else {
      return rejectWithValue(error.message)
      toast(error.message)
    }
  }
})
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      console.log('logging out')
      Cookies.remove('userToken')
      state.userToken = null
      state.login = false
    },
    resetState: (state) => {
      state.loading = false
      state.error = null
      state.success = false
    },
  },
  extraReducers(builder) {
    // register user
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false
        state.success = true // registration successful
      })

      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
      //login User
      .addCase(userLogin.pending, (state, action) => {
        state.loading = true
        state.error = null
      })

      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false

        state.userToken = payload.data.token
        state.role = payload.data.role
        Cookies.set('userToken', payload.data.token)
        state.login = true // login successful
      })

      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
        state.login = true
      })
  },
})

export default authSlice.reducer
export const { logout, resetState } = authSlice.actions
