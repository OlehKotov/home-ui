import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/slice";
import readingsReducer from "./readings/slice";
import apartmentReducer from "./apartment/slice";
import userReducer from "./user/slice";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "isLoggedIn", "isDraftUser", "draftUser"],
};

const persistedUserReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedUserReducer,
    apartment: apartmentReducer,
    readings: readingsReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;