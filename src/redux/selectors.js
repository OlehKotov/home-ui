export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsLoading = (state) =>
  state.auth.isLoading || state.readings.isLoading || state.apartment.isLoading;
export const selectIsError = (state) => state.auth.isError || state.readings.isError || state.apartment.isError;
export const selectIsDraftUser = (state) => state.auth.isDraftUser;
export const selectUserName = (state) => state.auth.user.name;
export const selectUserEmail = (state) => state.auth.user.email;
export const selectUserPass = (state) => state.auth.user.password;
export const selectUserPhone = (state) => state.auth.user.phone;
export const selectUserId = (state) => state.auth.user._id;
export const selectUserApartmentId = (state) => state.auth.user.apartmentId;
export const selectUserRole = (state) => state.auth.user.role;
export const selectDraftEmail = (state) => state.auth.draftUser.email;
export const selectDraftPassword = (state) => state.auth.draftUser.password;

export const selectReadings = (state) => state.readings.readings;
export const selectApartment = (state) => state.apartment.apartment;
export const selectUser = (state) => state.user.user;

