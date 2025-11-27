import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchUserByUserId } from "./operations";
import { logoutUser } from "../auth/operations";

const initialState = {
  user: [],
  isLoading: false,
  isError: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUser(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(logoutUser.fulfilled, () => initialState)
      .addMatcher(isAnyOf(fetchUserByUserId.pending, logoutUser.pending), (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addMatcher(isAnyOf(fetchUserByUserId.rejected, logoutUser.rejected), (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;