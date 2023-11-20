import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
  Middleware,
} from "@reduxjs/toolkit";

// api
import productApi, { productReducer } from "../../src/api/product";
import categoryApi, { categoryReducer } from "../../src/api/categories";
import authApi, { authReducer } from "../../src/api/auth";
import commentApi, { commentReducer } from "../../src/api/comment.tsx";

// giỏ hàng
import cartReducer from "./cartSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // chỉ lưu trữ reducer "cart"
};

const rootReducer = combineReducers({
  [productApi.reducerPath]: productReducer,
  [categoryApi.reducerPath]: categoryReducer,
  auth: authReducer,
  cart: cartReducer,
  comment: commentReducer,
});

const customMiddleware: Middleware[] = [
  productApi.middleware,
  categoryApi.middleware,
  authApi.middleware,
];

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  // {
  //   cart: cartReducer,
  //   persisted: persistedReducer,
  // },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    // Thêm middleware của Redux Persist ở đây
  ]
    .concat(productApi.middleware)
    .concat(categoryApi.middleware)
    .concat(commentApi.middleware)
    .concat(customMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
