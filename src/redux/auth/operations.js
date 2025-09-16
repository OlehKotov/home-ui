import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const instance = axios.create({
  baseURL: "https://home-mongodb-1.onrender.com",
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
      console.log("Login response:", response);
      setToken(response.data.data.accessToken);
      return response.data.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.user.accessToken;

      if (!token) {
        clearToken();
        return;
      }
      setToken(token);
      await instance.post("/auth/logout");
      clearToken();

      return;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);



// export const updateUser = createAsyncThunk('auth/update', async (data, thunkAPI) => {
//   try {
//     const res = await axios.patch('/users/update', data, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     return res.data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.message);
//   }
// });

// export const getAllUsers = createAsyncThunk('auth/getAllUsers', async (_, thunkAPI) => {
//   try {
//     const res = await axios.get('/users/registered-users');

//     return res.data.data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.message);
//   }
// });

// export const loginUserGoogle = createAsyncThunk('auth/loginGoogle', async (_, thunkAPI) => {
//   try {
//     const persistedToken = localStorage.getItem('accessToken');

//     if (persistedToken === null) {
//       return thunkAPI.rejectWithValue('Unable to fetch user');
//     }

//     setAuthHeader(persistedToken);

//     const res = await axios.get('/users/current-user-data');

//     return res.data.data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.message);
//   }
// });
