import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../axios";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/users`);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch users");
    }
  }
);

export const fetchUserByUserId = createAsyncThunk(
  "users/fetchUserByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/users/${userId}`);
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user by id"
      );
    }
  }
);