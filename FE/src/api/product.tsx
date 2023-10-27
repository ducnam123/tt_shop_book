import { IBooks } from "../interfaces/book";
import { pause } from "../utils/pause";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productApi = createApi({
  reducerPath: "books",
  tagTypes: ["Book"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
    fetchFn: async (...arg) => {
      await pause(1000);
      return await fetch(...arg);
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<IBooks[], void>({
      query: () => `/books`,
      providesTags: ["Book"],
    }),
    getProductById: builder.query<IBooks, number | string>({
      query: (id) => `/books/${id}`,
      providesTags: ["Book"],
    }),
    removeProduct: builder.mutation<void, number | string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),
    addProduct: builder.mutation<IBooks, IBooks>({
      query: (book) => ({
        url: `/books`,
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["Book"],
    }),
    updateProduct: builder.mutation<IBooks, IBooks>({
      query: (book) => ({
        url: `/books/${book._id}`,
        method: "PATCH",
        body: book,
      }),
      invalidatesTags: ["Book"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useRemoveProductMutation,
} = productApi;
export const productReducer = productApi.reducer;
export default productApi;
