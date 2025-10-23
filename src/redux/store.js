import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/slice";
import readingsReducer from "./readings/slice";
import apartmentReducer from "./apartment/slice";
import invoicesReducer from "./invoices/slice";

const authPersistConfig  = {
  key: "auth",
  storage,
  whitelist: ["user", "isLoggedIn", "isDraftUser", "draftUser"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    apartment: apartmentReducer,
    readings: readingsReducer,
    invoices: invoicesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;