import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(
  async (config) => {
    //DO SOMETHING ON REQ
    return config;
  },
  (error) => {
    //DO SOMETHING WHEN REQ ERROR
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    //DO SOMETHING WHEN GET RESPONSE
    return response;
  },
  (error) => {
    //DO SOMETHING WHEN GET ERR RESPONSE
    return Promise.reject(error);
  }
);
export { api };
