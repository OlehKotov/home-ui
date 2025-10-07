import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchReadingsByApartmentId } from "./operations";

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
      .addMatcher(isAnyOf(fetchReadingsByApartmentId.pending), (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addMatcher(isAnyOf(fetchReadingsByApartmentId.rejected), (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default readingsSlice.reducer;
