import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth, createRequest } from "./shared";

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["auth"],
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
          url: `user/forgot/password`,
          method: "post",
          body: data,
        };
      },
    }),
    resendToken: builder.mutation({
      query: (data) => {
        return {
          url: `user/resend/token`,
          method: "post",
          body: data,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (data) => {
        return {
          url: `user/reset/password`,
          method: "post",
          body: data,
        };
      },
    }),

    getProfile: builder.query({
      query: () => createRequest(`user/getone`),
      transformResponse: (response) => {
        return response.data?.user;
      },

      providesTags: (result, _error, _arg) => (result?.data ? [{ type: "auth", id: result?.data?.id }] : [{ type: "auth", id: "current" }]),
    }),

    updateUserMutation: builder.mutation({
      query: (data) => {
        return {
          url: `user/update`,
          method: "post",
          body: data,
        };
      },
      invalidatesTags: (result, _error, _arg) => [{ type: "auth", id: result?.data?.id }],
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
  useResendTokenMutation,
  useUpdateUserMutationMutation,
  useGetProfileQuery,
} = authApi;
