import axios from '../axios'
//getting item
export async function itemGet(thunkAPI) {
  const { getState } = thunkAPI
  const token = getState().auth.userToken
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const controller = new AbortController()
  //   signal.addEventListener('abort', () => {
  //     controller.abort()
  //   })
  try {
    const response = await axios.get('/items', config, {
      signal: controller.signal,
    })
    // console.log(response.data)
    return response.data.data
  } catch (error) {
    return rejectWithValue(error)
  }
}
//posting item
export async function itemPost(data, thunkAPI) {
  const { getState } = thunkAPI
  const token = getState().auth.userToken
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const controller = new AbortController()
  //   signal.addEventListener('abort', () => {
  //     controller.abort()
  //   })
  try {
    const response = await axios.post('/items', data, config, {
      signal: controller.signal,
    })
    console.log(response.data)
    return response.data.data
  } catch (error) {
    return rejectWithValue(error)
  }
}
//updating item
// export async function mainCategoryUpdate(data, thunkAPI) {
//   const { getState } = thunkAPI
//   const token = getState().auth.userToken
//   const config = { headers: { Authorization: `Bearer ${token}` } }
//   const controller = new AbortController()
//   //   signal.addEventListener('abort', () => {
//   //     controller.abort()
//   //   })
//   try {
//     const response = await axios.post('/categories', data, config, {
//       signal: controller.signal,
//     })
//     console.log(response.data)
//     return response.data.data
//   } catch (error) {
//     return rejectWithValue(error)
//   }
// }
