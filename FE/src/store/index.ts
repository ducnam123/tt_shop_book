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
import { combineReducers, configureStore, Middleware } from "@reduxjs/toolkit";

// api
import productApi, { productReducer } from "../../src/api/product";
import categoryApi, { categoryReducer } from "../../src/api/categories";
import authApi, { authReducer } from "../../src/api/auth";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // để lưu thông tin, tài khoản ,cart ... vào state
};

const rootReducer = combineReducers({
  [productApi.reducerPath]: productReducer,
  [categoryApi.reducerPath]: categoryReducer,
  auth: authReducer,
});

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
