import { pause } from "../utils/pause";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const commentApi = createApi({
  reducerPath: "comment",
  tagTypes: ["Comment"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  endpoints: (builder) => ({
    getComments: builder.query<any[], void>({
      query: () => `/comment/`,
      providesTags: ["Comment"],
    }),

    getCommentById: builder.query<any, string>({
      query: (id) => `/comment/${id}`,
      providesTags: ["Comment"],
    }),
    removeComment: builder.mutation<void, string>({
      query: (id) => ({
        url: `/comment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment"],
    }),
    addComment: builder.mutation<any, any>({
      query: (comment) => ({
        url: `/comment`,
        method: "POST",
        body: comment,
      }),
      invalidatesTags: ["Comment"],
    }),
    updateComment: builder.mutation<any, any>({
      query: (comment) => ({
        url: `/comment/${comment.id}`,
        method: "PATCH",
        body: comment,
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useGetCommentByIdQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useRemoveCommentMutation,
} = commentApi;
export const commentReducer = commentApi.reducer;
export default commentApi;
