import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth, createRequest, createRequestWithParams } from "./shared";

export const roleApi = createApi({
  reducerPath: "roleApi",
  tagTypes: ["roles", "users"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createRole: builder.mutation({
      query: (data) => {
        return {
          url: `role`,
          method: "post",
          body: data,
        };
      },
      invalidatesTags: ["roles"],
    }),
    updateRole: builder.mutation({
      query: (id) => {
        return {
          url: `role/${id}`,
          method: "PUT",
          body: {},
        };
      },
      invalidatesTags: (_result, _error, id) => [{ type: "roles", id }],
    }),
    getRoles: builder.query({
      query: ({ paginate, page, per_page, search }) => createRequestWithParams(`role`, { paginate, page, per_page, search }),
      providesTags: (result, _error, _arg) => (result?.data ? [...result?.data.map(({ id }) => ({ type: "roles", id })), "roles"] : ["roles"]),
    }),

    getARole: builder.query({
      query: (id) => createRequest(`role/${id}`),
      providesTags: (_result, _error, id) => [{ type: "roles", id }],
    }),

    getPermissions: builder.query({
      query: () => createRequest(`role/permissions`),
    }),

    deleteRole: builder.mutation({
      query: (id) => {
        return {
          url: `role/${id}`,
          method: "delete",
        };
      },
      invalidatesTags: (_result, _error, id) => [{ type: "roles", id }],
    }),

    getAdminUsers: builder.query({
      query: ({ paginate, page, per_page, search }) => createRequestWithParams(`users`, { paginate, page, per_page, search }),
      providesTags: (result, _error, _arg) => (result?.data ? [...result?.data.map(({ id }) => ({ type: "users", id })), "users"] : ["users"]),
    }),

    createUser: builder.mutation({
      query: (data) => {
        return {
          url: `users`,
          method: "post",
          body: data,
        };
      },
      invalidatesTags: ["users"],
    }),

    deleteUser: builder.mutation({
      query: (id) => {
        return {
          url: `users/${id}`,
          method: "delete",
        };
      },
      invalidatesTags: (_result, _error, id) => [{ type: "users", id }],
    }),
  }),
});

export const {
  useCreateRoleMutation,
  useDeleteRoleMutation,
  useGetRolesQuery,
  useUpdateRoleMutation,
  useGetPermissionsQuery,
  useGetARoleQuery,
  useGetAdminUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
} = roleApi;
