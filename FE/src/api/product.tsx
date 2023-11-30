import { IBooks } from "../interfaces/book";
import { pause } from "../utils/pause";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productApi = createApi({
  reducerPath: "books",
  tagTypes: ["Book"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
    prepareHeaders(headers) {
      const getToken = localStorage.getItem("Token");
      const token = getToken?.slice(1, -1);
      if (token) {
        headers.set("Authorization", `Bearer ` + token);
      }
      return headers;
    },
    fetchFn: async (...arg) => {
      await pause(0);
      return await fetch(...arg);
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<IBooks[], void>({
      query: () => `/books/`,
      providesTags: ["Book"],
    }),
    // phân trang sản phẩm
    getProductsPage: builder.query<IBooks[], { page?: number }>({
      query: ({ page = 1 }) => `/books?_page=${page}`,
      providesTags: (result, error, { page = 1 }) => [
        { type: "Book", id: page },
      ],
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
        url: `/books/${book.id}`,
        method: "PATCH",
        body: book,
      }),
      invalidatesTags: ["Book"],
    }),

    searchProduct: builder.query<any, string>({
      query: (book) => ({
        url: `/book/search?query=${book}`,
        providesTags: ["Book"],
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useRemoveProductMutation,
  useGetProductsPageQuery,
  useSearchProductQuery,
} = productApi;
export const productReducer = productApi.reducer;
export default productApi;
