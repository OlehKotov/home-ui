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


// export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
//   try {
//     const res = await axios.post('/users/logout');
//     clearAuthHeader();
//     localStorage.removeItem('accessToken');
//     return res.data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.message);
//   }
// });

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