import axios from '../axios'
//getting table
export async function tableGet(thunkAPI) {
  const { getState } = thunkAPI
  const token = getState().auth.userToken
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const controller = new AbortController()

  try {
    const response = await axios.get('/tables', config, {
      signal: controller.signal,
    })
    // console.log('tabld Data', response.data)
    return response.data.data
  } catch (error) {
    return rejectWithValue(error)
  }
}
//posting table
export async function tablePost(data, thunkAPI) {
  const { getState } = thunkAPI
  const token = getState().auth.userToken
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const controller = new AbortController()
  //   signal.addEventListener('abort', () => {
  //     controller.abort()
  //   })
  try {
    const response = await axios.post('/tables', data, config, {
      signal: controller.signal,
    })
    console.log(response.data)
    return response.data.data
  } catch (error) {
    return rejectWithValue(error)
  }
}
//updating main category
// export async function mainCategoryUpdate(data, thunkAPI) {
//   const { getState } = thunkAPI
//   const token = getState().auth.userToken
//   const config = { headers: { Authorization: `Bearer ${token}` } }
//   const controller = new AbortController()
//   //   signal.addEventListener('abort', () => {
//   //     controller.abort()
//   //   })
//   try {
//     const response = await axios.post('/updateCategory', data, config, {
//       signal: controller.signal,
//     })
//     console.log(response.data)
//     return response.data.data
//   } catch (error) {
//     return rejectWithValue(error)
//   }
// }
