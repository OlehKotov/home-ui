import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const instance = axios.create({
  baseURL: "https://home-mongodb-1.onrender.com",
  // baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const setToken = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () =>
  (instance.defaults.headers.common.Authorization = "");

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/auth/register", userData);

      if (data.data.accessToken) {
        setToken(data.data.accessToken);
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const completeProfile = createAsyncThunk(
  "auth/completeProfile",
  async (userData, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.user.accessToken;

    try {
      if (token) {
        setToken(token);
      }
      console.log(token);

      const { data } = await instance.patch("/auth/complete-profile", userData);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await instance.post("/auth/login", userData);
      setToken(response.data.data.accessToken);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const loginUserGoogle = createAsyncThunk(
  "auth/loginGoogleOAuth",
  async (code, { dispatch, rejectWithValue }) => {
    try {
      const response = await instance.post(
        "/auth/confirm-oauth",
        { code },
        { withCredentials: true }
      );

      const userData = response.data.data;

      localStorage.setItem("accessToken", userData.accessToken);
      setToken(userData.accessToken);
      return userData;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.user.accessToken;

    if (token) {
      setToken(token);
    }
    try {
      await instance.post("/auth/logout", null, { withCredentials: true });

      clearToken();
      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("googleAuthDone");

      return;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteUserAndLogout = createAsyncThunk(
  "auth/deleteUserAndLogout",
  async (userId, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.user.accessToken;

    if (!userId) return rejectWithValue("User ID is required");

    if (token) {
      setToken(token);
    }

    try {
      await instance.delete(`/users/me/${userId}`, { withCredentials: true });

      return;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
