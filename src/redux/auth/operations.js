import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance, setToken } from "../axios";

// export const registerUser = createAsyncThunk(
//   "auth/register",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await instance.post("/auth/register", userData);

//       setToken(response.data.data.accessToken);

//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const completeProfile = createAsyncThunk(
//   "auth/completeProfile",
//   async (userData, { getState, rejectWithValue }) => {
//     const state = getState();
//     setToken(state.auth.user.accessToken);

//     try {
//       const response = await instance.patch("/auth/complete-profile", userData);
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await instance.post("/auth/register", userData);
      setToken(response.data.data.accessToken);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
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
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

export const loginUserGoogle = createAsyncThunk(
  "auth/loginGoogleOAuth",
  async (code, { rejectWithValue }) => {
    try {
      const response = await instance.post("/auth/confirm-oauth", { code });

      setToken(response.data.data.accessToken);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",

  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    setToken(state.auth.user.accessToken);

    try {
      await instance.post("/auth/logout");
      sessionStorage.removeItem("googleAuthDone");
      // clearToken();
      // localStorage.removeItem("accessToken");
      // sessionStorage.removeItem("googleAuthDone");

      return;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Logout failed"
      );
    }
  }
);

// export const cancelCompleteProfile = createAsyncThunk(
//   "auth/cancelCompleteProfile",
//   async (userId, { getState, rejectWithValue }) => {
//     const state = getState();
//     setToken(state.auth.user.accessToken);

//     if (!userId) return rejectWithValue("User ID is required");

//     try {
//       await instance.delete(`/users/me/${userId}`);
//       return;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );


