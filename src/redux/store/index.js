import { reduxBatch } from "@manaflair/redux-batch";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

import { rootReducer } from "../root-reducer";
import { authApi, roleApi } from "../services";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
      thunk: true,
    }),
    authApi.middleware,
    roleApi.middleware,
  ],
  devTools: process.env.NODE_ENV !== "production",
  enhancers: [reduxBatch],
});

export const persistor = persistStore(store);
