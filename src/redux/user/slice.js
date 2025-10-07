import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchUserByUserId } from "./operations";

const initialState = {
  user: [],
  isLoading: false,
  isError: false,
};

const userSlice = createSlice({
  name: "apartment",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addMatcher(isAnyOf(fetchUserByUserId.pending), (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addMatcher(isAnyOf(fetchUserByUserId.rejected), (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default userSlice.reducer;