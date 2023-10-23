import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAuth } from "../interfaces/auth";

const authApi = createApi({
  reducerPath: "auth",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8080/api`,
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<IAuth[], void>({
      query: () => `users`,
      providesTags: ["User"],
    }),

    removeUsers: builder.mutation<void, number | string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
    }),

    editUsers: builder.mutation<IAuth, IAuth>({
      query: (users) => ({
        url: `/users/${users._id}`,
        method: "PATCH",
        body: users,
      }),
    }),

    signup: builder.mutation<
      { message: string; accessToken: string; user: {} },
      IAuth
    >({
      query: (credentials) => ({
        url: "/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    signin: builder.mutation<
      { message: string; accessToken: string; user: {} },
      IAuth
    >({
      query: (credentials) => ({
        url: "/signin",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useGetUsersQuery,
  useEditUsersMutation,
  useRemoveUsersMutation,
} = authApi;
export const authReducer = authApi.reducer;
export default authApi;
