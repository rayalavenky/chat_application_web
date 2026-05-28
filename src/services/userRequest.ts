import { api } from "./api";

interface ReceivedRequestResponse {
  data: {
    requestId: string;
    toUserId: string;
    status: string;
    fromUserId: string;
    createdAt: string;
    toUser: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      bio: string;
      isOnline: boolean;
    };
  }[];
  message: string;
  status: string;
}

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

    getReceivedRequests: builder.query<ReceivedRequestResponse,{userId: string;}>({
      query: ({ userId }) => ({
        url: `users/requests/received/${userId}`,
        method: "GET",
      }),
      providesTags: ["ReceivedRequest"],
    }),

    getSendRequests: builder.query<ReceivedRequestResponse,{userId: string;}>({
      query: ({ userId }) => ({
        url: `users/requests/sent/${userId}`,
        method: "GET",
      }),
    }),

    acceptConnectionRequest: builder.mutation({
      query: ({ requestId }) => ({
        url: `users/requests/accept/${requestId}`,
        method: "PUT",
      }),
      invalidatesTags: ["ReceivedRequest"],
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
  useGetReceivedRequestsQuery,
  useGetSendRequestsQuery,
  useAcceptConnectionRequestMutation,
  useGetUserContactsMutation,
} = userRequest;
