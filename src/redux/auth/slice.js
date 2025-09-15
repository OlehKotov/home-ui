import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { completeProfile, logout, registerUser } from "./operations";

const initialState = {
  user: {
    name: null,
    email: null,
    phone: null,
    accessToken: null,
    apartmentId: null,
    role: null,
    id: null,
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
        state.user.id = action.payload._id;
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
      .addCase(logout.fulfilled, () => initialState)

      // .addCase(login.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isLoggedIn = true;
      //   state.user.name = action.payload.name;
      //   state.user.email = action.payload.email;
      //   state.user.token = action.payload.token;
      // })

      .addMatcher(
        isAnyOf(
          registerUser.pending,
          completeProfile.pending,
          logout.pending
          // login.pending,
          // currentUserFull.pending,

          // editUser.pending,
          // addPet.pending,
          // deletePet.pending,
          // addFavoriteNotice.pending,
          // deleteFavoriteNotice.pending,
          // addNoticeToViewed.pending
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
          logout.rejected
          // login.rejected,
          // currentUserFull.rejected,
          // editUser.rejected,
          // addPet.rejected,
          // deletePet.rejected,
          // addFavoriteNotice.rejected,
          // deleteFavoriteNotice.rejected,
          // addNoticeToViewed.rejected
        ),
        (state) => {
          state.isLoading = false;
          state.isError = true;
        }
      );
  },
});

export default userSlice.reducer;
