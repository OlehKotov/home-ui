import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchApartment, fetchApartmentByApartmentId } from "./operations";
import { logoutUser } from "../auth/operations";

const initialState = {
  apartments: [],
  apartment: null,
  isLoading: false,
  isError: false,
};

const apartmentSlice = createSlice({
  name: "apartment",
  initialState,
  extraReducers: (builder) => {
    builder
    .addCase(fetchApartment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.apartments = action.payload.data;
      })
      .addCase(fetchApartmentByApartmentId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.apartment = action.payload;
      })
      .addCase(logoutUser.fulfilled, () => initialState)
      .addMatcher(isAnyOf(fetchApartmentByApartmentId.pending, fetchApartment.pending, logoutUser.pending), (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addMatcher(isAnyOf(fetchApartmentByApartmentId.rejected, fetchApartment.rejected, logoutUser.rejected), (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default apartmentSlice.reducer;
