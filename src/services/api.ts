import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

import { logout, setCredentials } from "../store/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL,

  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = (getState() as RootState).user?.accessToken;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const uploadEndpoints = [
      "uploadPilotDocument",
      "uploadDocument",
      "uploadMultipleDocuments",
      "uploadDefectImage",
    ];

    if (!uploadEndpoints.includes(endpoint || "")) {
      headers.set("Content-Type", "application/json");
    }

    return headers;
  },
});

// Create a base API service using RTK Query

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {

  let result = await baseQuery(args, api, extraOptions);

  // Access token expired
  if (result?.error?.status === 401) {

    const refreshToken = (api.getState() as RootState).user?.refreshToken;

    // Call refresh token API
    const refreshResult: any = await baseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
        body: {
          refreshToken,
        },
      },
      api,
      extraOptions
    );

    // Refresh success
    if (refreshResult?.data) {

      const newAccessToken = refreshResult.data.accessToken;

      // Store new token
      api.dispatch(
        setCredentials({
          accessToken: newAccessToken,
          refreshToken: refreshResult.data.refreshToken,
        })
      );

      // Retry original request
      result = await baseQuery(args, api, extraOptions);

    } else {

      // Refresh failed -> logout
      api.dispatch(logout());
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes : ['authApi', 'userApi', "UserProfile", "Users", "userRequest"],
  endpoints: () => ({}),
});
