import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../axios";

export const fetchReadingsByApartmentId = createAsyncThunk(
  "readings/fetchReadingsByApartmentId",
  async ({ apartmentId, limit = 2 }, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/readings/${apartmentId}?limit=${limit}`);
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch readings"
      );
    }
  }
);

export const updateReadingsByApartmentId = createAsyncThunk(
  "readings/updateReadingsByApartmentId",
  async ({ apartmentId, month, waterCold, waterHot, electricity }, { rejectWithValue }) => {
    try {
      const { data } = await instance.patch(`/readings/${apartmentId}`, {
        month,
        waterCold,
        waterHot,
        electricity,
      });
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update readings"
      );
    }
  }
);
