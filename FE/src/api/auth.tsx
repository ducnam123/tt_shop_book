import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAuth } from "../interfaces/auth";

const authApi = createApi({
  reducerPath: "auth",
  tagTypes: ["User"],
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
  }),
  endpoints: (builder) => ({
    // quản lí tài khoản
    getUsers: builder.query<IAuth[], void>({
      query: () => `users`,
      providesTags: ["User"],
    }),

    //! test lấy getUser = token
    getUserById: builder.query<any, void>({
      query: (id: any) => {
        const getToken = localStorage.getItem("Token");
        const token = getToken?.slice(1, -1);

        return {
          url: `/users/${id}`,
          method: "GET",
          headers: {
            Authorization: "Bearer" + token,
          },
        };
      },
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

    favoriteProducts: builder.mutation({
      query: (id: any) => {
        const token = localStorage.getItem("Token");
        return {
          url: `/favorites/${id}`,
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
        };
      },
      invalidatesTags: ["User"],
    }),
    getFavoritesByUser: builder.query<any, void>({
      query: () => {
        const token = localStorage.getItem("Token");

        return {
          url: `/favorites`,
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        };
      },
      providesTags: ["User"],
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

    // quên mật khẩu
    forgotPasswordAuth: builder.mutation({
      query: (email) => ({
        url: `/forgot-password`,
        method: "POST",
        body: email,
      }),
    }),
    resetPasswordAuth: builder.mutation({
      query: (
        data
        //   : {
        //   password: string;
        //   randomCode: string;
        //   randomString: string | undefined;
        // }
      ) => {
        const forgotToken = localStorage.getItem("forgotToken");

        return {
          url: `/reset-password`,
          method: "POST",
          body: data,
          headers: {
            Authorization: "Bearer " + forgotToken,
          },
        };
      },
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
  useGetFavoritesByUserQuery,
  useFavoriteProductsMutation,
  useForgotPasswordAuthMutation,
  useResetPasswordAuthMutation,
} = authApi;
export const authReducer = authApi.reducer;
export default authApi;
