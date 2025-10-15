import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  fetchReadingsByApartmentId,
  updateReadingsByApartmentId,
} from "./operations";
import { logoutUser } from "../auth/operations";

const initialState = {
  readings: [],
  isLoading: false,
  isError: false,
};

const readingsSlice = createSlice({
  name: "readings",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchReadingsByApartmentId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.readings = action.payload;
      })
      .addCase(updateReadingsByApartmentId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.readings = action.payload;
      })
      .addCase(logoutUser.fulfilled, () => initialState)
      .addMatcher(
        isAnyOf(
          fetchReadingsByApartmentId.pending,
          updateReadingsByApartmentId.pending
        ),
        (state) => {
          state.isLoading = true;
          state.isError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchReadingsByApartmentId.rejected,
          updateReadingsByApartmentId.rejected
        ),
        (state) => {
          state.isLoading = false;
          state.isError = true;
        }
      );
  },
});

export default readingsSlice.reducer;
