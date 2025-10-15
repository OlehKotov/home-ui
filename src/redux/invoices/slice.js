import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { logoutUser } from "../auth/operations";
import { fetchInvoicesByApartmentId } from "./operations";

const initialState = {
  invoices: [],
  isLoading: false,
  isError: false,
};

const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoicesByApartmentId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.invoices = action.payload;
      })
      .addCase(logoutUser.fulfilled, () => initialState)
      .addMatcher(
        isAnyOf(
          fetchInvoicesByApartmentId.pending,
        ),
        (state) => {
          state.isLoading = true;
          state.isError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchInvoicesByApartmentId.rejected,
        ),
        (state) => {
          state.isLoading = false;
          state.isError = true;
        }
      );
  },
});

export default invoicesSlice.reducer;