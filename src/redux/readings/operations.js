import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../axios";

export const fetchReadingsByApartmentId = createAsyncThunk(
  "readings/fetchReadingsByApartmentId",
  async (apartmentId, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/readings/${apartmentId}`);
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch readings"
      );
    }
  }
);
