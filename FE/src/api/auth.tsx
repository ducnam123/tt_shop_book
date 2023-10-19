import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAuth } from "../interfaces/auth";

interface AuthSignup {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}
interface AuthSignin {
  email: string;
  password: string;
}
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

    signup: builder.mutation<
      { message: string; accessToken: string; user: {} },
      AuthSignup
    >({
      query: (credentials) => ({
        url: "/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    signin: builder.mutation<
      { message: string; accessToken: string; user: {} },
      AuthSignin
    >({
      query: (credentials) => ({
        url: "/signin",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useSignupMutation, useSigninMutation, useGetUsersQuery } =
  authApi;
export const authReducer = authApi.reducer;
export default authApi;
