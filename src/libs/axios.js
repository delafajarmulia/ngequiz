// // src/libs/axios.js
// import axios from 'axios'
// import { getTokenAction } from './auth-libs'

// const instance = axios.create({
//   baseURL: 'http://localhost:2007/api/v1'
// })

// instance.interceptors.request.use(config => {
//   const token = getTokenAction()
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })

// instance.interceptors.response.use(
//   res => res,
//   err => {
//     if (err.response?.status === 401) {
//       localStorage.removeItem('token')
//       window.location.href = '/login'
//     }
//     return Promise.reject(err)
//   }
// )

// export default instance
