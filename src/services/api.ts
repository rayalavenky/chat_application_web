import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

// Create a base API service using RTK Query

export const api = createApi({
    reducerPath : 'api',
    baseQuery : fetchBaseQuery({
        baseUrl : process.env.REACT_APP_BASE_URL,
        prepareHeaders : (headers , {getState , endpoint}) => {
             // Get the auth token from session storage
            const token = (getState() as RootState).user?.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
            const uploadEndpoints = ['uploadPilotDocument', 'uploadDocument', 'uploadMultipleDocuments', 'uploadDefectImage'];
            if (!uploadEndpoints.includes(endpoint || '')) {
                headers.set('Content-Type', 'application/json');
            }
            return headers;
        }
    }),
     // Define tag types for cache invalidation
    tagTypes : ['authApi', 'userApi', "UserProfile", "Users", "userRequest"],
    // Endpoints will be injected from other files
    endpoints : ()=>({})
});