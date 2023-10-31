import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAuth } from "../interfaces/auth";

const authApi = createApi({
  reducerPath: "auth",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  endpoints: (builder) => ({
    // quản lí tài khoản
    getUsers: builder.query<IAuth[], void>({
      query: () => `users`,
      providesTags: ["User"],
    }),

    getUserById: builder.query<IAuth, string | number>({
      query: (id: string | number) => `/users/${id}`,
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
        url: `/users/${users.id}`,
        method: "PATCH",
        body: users,
      }),
    }),

    // đăng nhập - đăng ký
    signup: builder.mutation<
      { message: string; accessToken: string; user: any },
      IAuth
    >({
      query: (credentials) => ({
        url: "/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    signin: builder.mutation<
      { message: string; accessToken: string; user: any },
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
  useGetUserByIdQuery,
} = authApi;
export const authReducer = authApi.reducer;
export default authApi;
