////axios instance code shubham sir
// import axios from "axios";
// export const httpinstance = axios.create({
//   // baseURL: "127.0.0.1:8000",
//   // baseURL: "https://webcrown.initiativewater.com",
//   baseURL: process.env.REACT_APP_API_BASE_URL,

//   headers: { "Content-Type": "application/json" },
// });

// httpinstance.interceptors.request.use(async (request) => {
//   const token = localStorage.getItem("accessToken");
//   if (token) request.headers.Authorization = Token ${token};
//   return request;
// });

// httpinstance.interceptors.response.use(
//   async (responce) => {
//     return responce;
//   },
//   async (error) => {
//     // if (error.response.hasOwnProperty("status") === 401) {
//     if (error?.response?.status === 401) {
//       let keysToRemove = ["user", "accessToken"];
//       for (let key of keysToRemove) {
//         localStorage.removeItem(key);
//       }
//       window.location.href = "/";
//     }
//     return Promise.reject(error);
//   }
// );


import axios from "axios";  
const instance=axios.create({
    baseURL:"http://localhost:5000/"
})
export default instance;