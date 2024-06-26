import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:4001';


export const adminApiSlice = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" }),
  endpoints: (builder) => ({
    adminlogin: builder.mutation({
      query: (userData) => ({
        url: '/api/admin/adminlogin',
        method: 'POST',
        body: userData,
      }),
    }),
    getUserData: builder.mutation({
      query: ({ search, page }) => {
        console.log(`Searching for: ${search}  pages:${page}`);
        return {
          url: `/api/admin/getUser?search=${search}&page=${page}`,
          method: "GET",
        };
      },
    }),    
    editUser: builder.mutation({
      query: (userData) => ({
        url: '/api/admin/updateuser',
        method: 'POST',
        body: userData,
      }),
    }),
    addUser: builder.mutation({
      query: (userData) => ({
        url: `/api/admin/adminadduser`,
        method: "POST",
        body: userData
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/api/admin/adminlogout',
        method: 'POST',
      }),
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: '/api/admin/deleteuser',
        method: 'POST',
        body: { userId },
      }),
    }),
    adminAuth: builder.mutation({
      query: () => ({
        url: "/api/admin/adminauth",
        method: "GET",
      }),
    }),
  }),
})

export const { useAdminloginMutation, useGetUserDataMutation, useEditUserMutation,  useAddUserMutation,  useLogoutMutation,useDeleteUserMutation ,useAdminAuthMutation} = adminApiSlice;