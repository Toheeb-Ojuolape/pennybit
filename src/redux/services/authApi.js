import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth, createRequest } from "./shared";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    activateUser: builder.mutation({
      query: (data) => {
        return {
          url: `/user/verifyaccount`,
          method: "post",
          body: data,
        };
      },
    }),
    registerUser: builder.mutation({
      query: (data) => {
        return {
          url: `user/register`,
          method: "post",
          body: data,
        };
      },
    }),
    loginUser: builder.mutation({
      query: (data) => {
        return {
          url: `user/login`,
          method: "post",
          body: data,
        };
      },
    }),
    forgotPassword: builder.mutation({
      query: (data) => {
        return {
          url: `password/tokens`,
          method: "post",
          body: data,
        };
      },
    }),
    verifyForgotToken: builder.mutation({
      query: (data) => {
        return {
          url: `password/token/verify`,
          method: "post",
          body: data,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (data) => {
        return {
          url: `password/reset`,
          method: "post",
          body: data,
        };
      },
    }),

    logoutUser: builder.query({
      query: () => createRequest(`logout`),
    }),
  }),
});

export const {
  useActivateUserMutation,
  useLoginUserMutation,
  useLogoutUserQuery,
  useForgotPasswordMutation,
  useVerifyForgotTokenMutation,
  useResetPasswordMutation,
  useRegisterUserMutation,
} = authApi;
