import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../axios";

export const fetchUserByUserId = createAsyncThunk(
  "apartment/fetchUserByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/users/${userId}`);
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);