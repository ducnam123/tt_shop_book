// api
import productApi, { productReducer } from "../../src/api/product";
import categoryApi, { categoryReducer } from "../../src/api/categories";
import authApi, { authReducer } from "../../src/api/auth"; // đăng ký đăng nhập
import { combineReducers, configureStore, Middleware } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  [productApi.reducerPath]: productReducer,
  [categoryApi.reducerPath]: categoryReducer,

  // * user
  auth: authReducer,
});

// *
const customMiddleware: Middleware[] = [
  productApi.middleware,
  categoryApi.middleware,
  authApi.middleware,
];

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(productApi.middleware)
      .concat(categoryApi.middleware)
      .concat(customMiddleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default persistStore(store);
export const persistedStore = persistStore(store);
