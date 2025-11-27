
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsLoading = (state) =>
  state.auth.isLoading || state.readings.isLoading || state.apartment.isLoading;
export const selectIsError = (state) => state.auth.isError || state.readings.isError || state.apartment.isError;
export const selectIsDraftUser = (state) => state.auth.isDraftUser;
export const selectUser = (state) => state.auth.user;
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

// export const selectApartmentOwner = (state) => state.apartment.apartment.owner;
export const selectApartmentOwner = state =>
  state.apartment.apartment?.owner ?? null;

export const selectInvoices = (state) => state.invoices.invoices;

export const selectOwner = (state) => state.user.user;

export const selectApartments = state => state.apartment.apartments;
export const selectApartment = state => state.apartment.apartment;