import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../axios";

export const fetchInvoicesByApartmentId = createAsyncThunk(
  "invoices/fetchInvoicesByApartmentId",
  async ({ apartmentId, limit = 3 }, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/invoices/${apartmentId}?limit=${limit}`);
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch invoices"
      );
    }
  }
);