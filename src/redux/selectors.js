export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectIsError = (state) => state.auth.isError;

export const selectUserName = (state) => state.auth.user.name;
export const selectUserEmail = (state) => state.auth.user.email;
export const selectUserPhone = (state) => state.auth.user.phone;
export const selectUserApartmentNumber = (state) => state.auth.user.apartmentNumber;
export const selectUserRole = (state) => state.auth.user.role;
export const selectAccessToken = (state) => state.auth.user.accessToken;
