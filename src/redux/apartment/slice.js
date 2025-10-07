import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchApartmentByApartmentId } from "./operations";

const initialState = {
  apartment: [],
  isLoading: false,
  isError: false,
};

const apartmentSlice = createSlice({
  name: "apartment",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchApartmentByApartmentId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.apartment = action.payload;
      })
      .addMatcher(isAnyOf(fetchApartmentByApartmentId.pending), (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addMatcher(isAnyOf(fetchApartmentByApartmentId.rejected), (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default apartmentSlice.reducer;