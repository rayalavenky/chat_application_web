// services/authApi.ts

import { api } from "./api";

export interface userData {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  age: number;
  role: string;
  isOnline: boolean;
  lastSeen: string;
  createdAt: string;
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  data: userData;
  message: string;
  status: string;
}

interface LoginRequest {
  email: string;
  password: string;
}
interface SignUpData {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  age: number;
  isOnline: boolean;
  lastSeen: string;
  createdAt: string;
}
interface SignUpResponse {
  data: SignUpData;
  message: string;
  status: string;
}

interface SignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  age: number;
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),
    }),

    register: builder.mutation<SignUpResponse, SignUpRequest>({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    verifyOTP: builder.mutation({
      query: (data) => ({
        url: "auth/verify-otp",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: "auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useVerifyOTPMutation,
  useResetPasswordMutation,
} = authApi;
