import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  // baseURL: `https://positive.api.sumagodemo.com/`,
  // baseURL: `https://api.positivemetering.in/`,
  // baseURL: `http://api.positivemetering.ae.sumagodemo.com/`,
  // baseURL: `https://apipositiveae.sumagodemo.com/`,
  // baseURL: `https://api.positivemetering.ae`,
  baseURL: `https://nodetest.positivemetering.in/`,
  // baseURL: `  http://127.0.0.1:8000/`,
});

instance.interceptors.request.use(
  async (request) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  async (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      let keysToRemove = ["accessToken"];
      for (let key of keysToRemove) {
        localStorage.removeItem(key);
      }
      toast.error("Unauthorized access - please log in.");
      window.location.href = "/"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default instance;