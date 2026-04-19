// services/authApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/auth/',
  }),
  endpoints: (builder) => ({
    
    login: builder.mutation({
      query: (data) => ({
        url: 'login',
        method: 'POST',
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: 'register',
        method: 'POST',
        body: data,
      }),
    }),

  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
} = authApi;