import axios from "axios";
import { API_BASE_URL } from "../constants";

export const clientApi = axios.create({
   baseURL: API_BASE_URL,
   headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
   },
});

// code for assigning the user token in every request
clientApi.interceptors.request.use((config) => {
   // const token = localStorage.getItem('token')

   // const token = 'sssssssssssssssss'

   // if (token) {
   //   config.headers.Authorization = `Bearer ${token}`
   // }

   return config;
});

clientApi.interceptors.response.use(
   (response) => {
      console.log("response interceptors", response);

      return response;
   },
   (error) => {
      if (error?.response?.status === 401) {
         //
         // clear token
         // logout
         //  localStorage.removeItem("token")
      }
      console.log("error interceptors", error);

      return Promise.reject(error);
   }
);
