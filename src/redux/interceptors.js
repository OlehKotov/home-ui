import { instance } from "./axios";
import { logoutUser } from "./auth/operations";
import store from "./store";

export const setupInterceptors = () => {
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        store.dispatch(logoutUser());
        window.location.href = "/signin";
      }
      return Promise.reject(error);
    }
  );
};



