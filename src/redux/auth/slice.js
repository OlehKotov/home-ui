import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  logoutUser,
  loginUser,
  registerUser,
  loginUserGoogle,
  requestResetEmail,
  resetPassword,
} from "./operations";

const initialState = {
  draftUser: {
    email: null,
    password: null,
  },
  user: {
    name: null,
    email: null,
    password: null,
    phone: null,
    apartmentId: null,
    role: null,
    _id: null,
  },
  isLoggedIn: false,
  isDraftUser: false,
  isLoading: false,
  isError: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setDraftUser: (state, action) => {
      state.draftUser.email = action.payload.email;
      state.draftUser.password = action.payload.password;
      state.isDraftUser = true;
    },
    clearDraftUser: (state) => {
      state.draftUser.email = null;
      state.draftUser.password = null;
      state.isDraftUser = false;
    },
    forceLogout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = { ...action.payload };
        state.draftUser = { email: null, password: null };
        state.isDraftUser = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = { ...action.payload };
      })
      .addCase(loginUserGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = { ...action.payload };
      })
      .addCase(logoutUser.fulfilled, () => initialState)
      .addCase(requestResetEmail.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(
          registerUser.pending,
          loginUser.pending,
          loginUserGoogle.pending,
          logoutUser.pending,
          requestResetEmail.pending,
          resetPassword.pending
        ),
        (state) => {
          state.isLoading = true;
          state.isError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          registerUser.rejected,
          loginUser.rejected,
          loginUserGoogle.rejected,
          logoutUser.rejected,
          requestResetEmail.rejected,
          resetPassword.rejected
        ),
        (state) => {
          state.isLoading = false;
          state.isError = true;
        }
      );
  },
});

export const { setDraftUser, clearDraftUser, forceLogout } = authSlice.actions;
export default authSlice.reducer;
