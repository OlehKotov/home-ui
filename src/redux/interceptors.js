import { instance } from "./axios";
import { forceLogout } from "./auth/slice";
import store from "./store";

export const setupInterceptors = () => {
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        store.dispatch(forceLogout());
        window.location.href = "/signin";
        return;
      }
      return Promise.reject(error);
    }
  );
};
