import axios from '../axios'

//posting payment
export async function paymentPost(data, thunkAPI) {
  const { getState } = thunkAPI
  const token = getState().auth.userToken
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const controller = new AbortController()
  //   signal.addEventListener('abort', () => {
  //     controller.abort()
  //   })
  try {
    const response = await axios.post('/payments', data, config, {
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
