import { ICategory } from "../interfaces/categorys";
import { pause } from "../utils/pause";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const categoryApi = createApi({
  reducerPath: "categoryApi",
  tagTypes: ["Category"],
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8080/api`,
    fetchFn: async (...args) => {
      await pause(100);
      return await fetch(...args);
    },
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<ICategory[], void>({
      query: () => `categories`,
      providesTags: ["Category"],
    }),
    getCategoryById: builder.query<ICategory, number | string>({
      query: (id) => `/categories/${id}`,
      providesTags: ["Category"],
    }),
    removeCategory: builder.mutation<void, number | string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    addCategory: builder.mutation<ICategory, ICategory>({
      query: (category) => ({
        url: `/categories`,
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation<ICategory, ICategory>({
      query: (category) => {
        const categoryCopy = { ...category };
        delete categoryCopy.id;
        return {
          url: `/categories/${category.id}`,
          method: "PATCH",
          body: categoryCopy,
        };
      },
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useRemoveCategoryMutation,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} = categoryApi;
export const categoryReducer = categoryApi.reducer;
export default categoryApi;
