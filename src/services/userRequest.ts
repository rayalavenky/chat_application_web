import { api } from "./api";

export const userRequest = api.injectEndpoints({
  endpoints: (builder) => ({
    sendConnectionRequest: builder.mutation({
      query: (data) => ({
        url: "users/requests/send",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    getReceivedRequests: builder.mutation({
      query: ({ userId }) => ({
        url: `users/requests/received/${userId}`,
        method: "GET",
      }),
      invalidatesTags: ["Users"],
    }),

    acceptConnectionRequest: builder.mutation({
      query: ({ requestId }) => ({
        url: `users/requests/accept/${requestId}`,
        method: "POST",
      }),
      invalidatesTags: ["Users"],
    }),

    getUserContacts: builder.mutation({
      query: ({ userId }) => ({
        url: `users/${userId}/contacts`,
        method: "GET",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});
export const {
  useSendConnectionRequestMutation,
  useGetReceivedRequestsMutation,
  useAcceptConnectionRequestMutation,
  useGetUserContactsMutation,
} = userRequest;
