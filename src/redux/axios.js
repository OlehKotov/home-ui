import axios from "axios";

export const instance = axios.create({
  baseURL: "https://home-mongodb-git-main-olehs-projects-15663df7.vercel.app",
  // baseURL: "http://localhost:3000",
  withCredentials: true,
});
