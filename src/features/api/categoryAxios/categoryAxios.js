import axios from '../axios'
//getting main category
export async function mainCategoryGet(thunkAPI) {
  const { getState } = thunkAPI
  const token = getState().auth.userToken
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const controller = new AbortController()
  //   signal.addEventListener('abort', () => {
  //     controller.abort()
  //   })
  try {
    const response = await axios.get('/categories', config, {
      signal: controller.signal,
    })
    console.log(response.data)
    return response.data.data
  } catch (error) {
    return rejectWithValue(error)
  }
}
//posting main category
export async function mainCategoryPost(data, thunkAPI) {
  const { getState, rejectWithValue, signal } = thunkAPI
  const token = getState().auth.userToken
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const controller = new AbortController()
  console.log('i am inside functoin', 'mainCategoryAdding')
  // signal.addEventListener('abort', () => {
  //   controller.abort()
  // })
  try {
    const response = await axios.post('/categories', data, config, {
      signal: controller.signal,
    })
    console.log(response.data)
    return response.data.data
  } catch (error) {
    return rejectWithValue(error)
  }
}
//updating main category
export async function mainCategoryUpdate(data, thunkAPI) {
  const { getState } = thunkAPI
  const token = getState().auth.userToken
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const controller = new AbortController()
  //   signal.addEventListener('abort', () => {
  //     controller.abort()
  //   })
  try {
    const response = await axios.post('/updateCategory', data, config, {
      signal: controller.signal,
    })
    console.log(response.data)
    return response.data.data
  } catch (error) {
    return rejectWithValue(error)
  }
}
//getting sub category
export async function subCategoryGet(thunkAPI) {
  const { getState } = thunkAPI
  const token = getState().auth.userToken
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const controller = new AbortController()
  //   signal.addEventListener('abort', () => {
  //     controller.abort()
  //   })
  try {
    const response = await axios.get('/sub_categories', config, {
      signal: controller.signal,
    })
    console.log(response.data)
    return response.data.data
  } catch (error) {
    return rejectWithValue(error)
  }
}
//posting sub category
export async function subCategoryPost(data, thunkAPI) {
  const { getState } = thunkAPI
  const token = getState().auth.userToken
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const controller = new AbortController()
  //   signal.addEventListener('abort', () => {
  //     controller.abort()
  //   })
  try {
    const response = await axios.post('/sub_categories', data, config, {
      signal: controller.signal,
    })
    console.log(response.data)
    return response.data.data
  } catch (error) {
    return rejectWithValue(error)
  }
}
