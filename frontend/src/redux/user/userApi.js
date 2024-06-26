import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:4001';

export const userApiSlice = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" }),


  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userData) => ({
        url: '/api/users/register',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/api/users/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    editUser: builder.mutation({
      query: (userData) => ({
        url: '/api/users/updateuser',
        method: 'POST',
        body: userData,
      }),
    }),
    getuser: builder.query({
      query: () => '/api/users/profile',
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/api/users/logout',
        method: 'POST',
      }),
    }),  
    getUserData: builder.mutation({
      query: () => ({
        url: "/api/users/auth",
        method: "GET",
      }),
    }),
  }),
  
});

export const { useSignupMutation, useLoginMutation, useEditUserMutation, useGetuserQuery, useLogoutMutation,useGetUserDataMutation } = userApiSlice;
