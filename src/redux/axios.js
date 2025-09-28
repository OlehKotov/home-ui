import axios from "axios";

export const instance = axios.create({
//   baseURL: "https://home-mongodb-1.onrender.com",
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const setToken = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  instance.defaults.headers.common.Authorization = "";
};
