import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  completeProfile,
  logoutUser,
  loginUser,
  registerUser,
  loginUserGoogle,
  deleteUserAndLogout,
} from "./operations";

const initialState = {
  user: {
    name: null,
    email: null,
    phone: null,
    accessToken: null,
    apartmentId: null,
    role: null,
    _id: null,
  },
  isLoggedIn: false,
  isDraftUser: false,
  isLoading: false,
  isError: false,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.isDraftUser = true;
        state.user.email = action.payload.email;
        state.user.role = action.payload.role;
        state.user._id = action.payload._id;
        state.user.apartmentId = action.payload.apartmentId;
        state.user.accessToken = action.payload.accessToken || null;
      })
      .addCase(completeProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.isDraftUser = false;
        state.user.name = action.payload.name;
        state.user.phone = action.payload.phone;
        state.user.apartmentId = action.payload.apartmentId;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.isDraftUser = false;
        state.user.name = action.payload.name;
        state.user.phone = action.payload.phone;
        state.user.apartmentId = action.payload.apartmentId;
        state.user.email = action.payload.email;
        state.user.role = action.payload.role;
        state.user.accessToken = action.payload.accessToken;
        state.user._id = action.payload._id;
      })
      .addCase(loginUserGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.isDraftUser = false;
        state.user.name = action.payload.name;
        state.user.phone = action.payload.phone;
        state.user.apartmentId = action.payload.apartmentId;
        state.user.email = action.payload.email;
        state.user.role = action.payload.role;
        state.user.accessToken = action.payload.accessToken;
        state.user._id = action.payload._id;
      })
      .addCase(deleteUserAndLogout.fulfilled, () => initialState)
      .addCase(logoutUser.fulfilled, () => initialState)
      .addMatcher(
        isAnyOf(
          registerUser.pending,
          completeProfile.pending,
          loginUser.pending,
          loginUserGoogle.pending,
          deleteUserAndLogout.pending,
          logoutUser.pending
        ),
        (state) => {
          state.isLoading = true;
          state.isError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          registerUser.rejected,
          completeProfile.rejected,
          loginUser.rejected,
          loginUserGoogle.rejected,
          deleteUserAndLogout.rejected,
          logoutUser.rejected
        ),
        (state) => {
          state.isLoading = false;
          state.isError = true;
        }
      );
  },
});

export default userSlice.reducer;
