import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../axios";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await instance.post("/auth/register", userData);
      return response.data.data;
    } catch (error) {
      if (!error.response) {
        return rejectWithValue("Network error. Please try again later.");
      }
      return rejectWithValue(
        error.response.data?.message || "Registration failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await instance.post("/auth/login", userData);
      return response.data.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data?.message || "Login failed");
      }
      if (error.request) {
        return rejectWithValue("Network error. Please try again later.");
      }
      return rejectWithValue(error.message || "Unexpected error");
    }
  }
);

export const loginUserGoogle = createAsyncThunk(
  "auth/loginGoogleOAuth",
  async (code, { rejectWithValue }) => {
    try {
      const response = await instance.post("/auth/confirm-oauth", { code });

      return response.data.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data?.message || "Login failed");
      } else if (error.request) {
        return rejectWithValue("Network error. Please try again later.");
      } else {
        return rejectWithValue(error.message || "Unexpected error");
      }
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await instance.post("/auth/logout");
      sessionStorage.removeItem("googleAuthDone");

      return;
    } catch (error) {
      sessionStorage.removeItem("googleAuthDone");
      return;
    }
  }
);

export const requestResetEmail = createAsyncThunk(
  "auth/requestResetEmail",
  async (email, { rejectWithValue }) => {
    try {
      await instance.post("/auth/request-reset-email", email);

      return;
    } catch (error) {
      if (!error.response) {
        return rejectWithValue("Network error. Please try again later.");
      }
      return rejectWithValue(error.response.data?.message || "Request failed");
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await instance.post("/auth/reset-password", {
        token,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reset password"
      );
    }
  }
);
