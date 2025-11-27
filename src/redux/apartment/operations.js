import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../axios";

export const fetchApartment = createAsyncThunk(
  "apartment/fetchApartment",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/apartments`);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch apartments");
    }
  }
);

export const fetchApartmentByApartmentId = createAsyncThunk(
  "apartment/fetchApartmentByApartmentId",
  async (apartmentId, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/apartments/${apartmentId}`);
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch apartment by id"
      );
    }
  }
);