import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create a base API service using RTK Query

export const api = createApi({
    reducerPath : 'api',
    baseQuery : fetchBaseQuery({
        baseUrl : process.env.REACT_APP_BASE_URL,
        prepareHeaders : (headers , {extra , endpoint}) => {
             // Get the auth token from session storage
            const authUser = sessionStorage.getItem('authUser');
            if (authUser) {
                try {
                    const user = JSON.parse(authUser);
                    if (user?.data?.token) {
                        headers.set('Authorization', `Bearer ${user.data.token}`);
                    }
                } catch (error) {
                    // Handle parse error silently
                }
            }
            const uploadEndpoints = ['uploadPilotDocument', 'uploadDocument', 'uploadMultipleDocuments', 'uploadDefectImage'];
            if (!uploadEndpoints.includes(endpoint || '')) {
                headers.set('Content-Type', 'application/json');
            }
            return headers;
        }
    }),
     // Define tag types for cache invalidation
    tagTypes : ['authApi'],
    // Endpoints will be injected from other files
    endpoints : ()=>({})
});