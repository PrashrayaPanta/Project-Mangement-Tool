import axios from "axios";
// import { FromStorage } from "../library";
import { toast } from "react-toastify";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// http.interceptors.request.use(
//   (config) => {
//     const token = FromStorage("r130cmtoken");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );

http.interceptors.response.use(
  (response) => {

    console.log(response);
    
    if ("message" in response.data) {

      // console.log(response.message);
      
      toast.success(response.data.message);
    }
    return response;
    // console.log(response);
  },

  (error) => {

    
    if ("message" in error.response.data) {
      toast.error(error.response.data.message);
      console.log(error.response.data);

      console.log(error.response.data.message);


    }
    return Promise.reject(error);
    // console.log(error);
  }
);

export default http;
