import { api } from "./api";

interface ContactsResponse {
  data: {
    id: string;
    userId: string;
    contactUserId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    isOnline: boolean;
    createdAt: string;
  }[];
  message: string;
  status: string;
}

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

    getUserContacts: builder.query<ContactsResponse, { userId: string }>({
      query: ({ userId }) => ({
        url: `users/contacts/${userId}`,
        method: "GET",
      }),
      // providesTags: ["Users"],
    }),

    rejectConnectionRequest: builder.mutation({
      query: ({ requestId }) => ({
        url: `users/requests/reject/${requestId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ReceivedRequest"],
    }),

    getOnlineContacts: builder.query<ContactsResponse, { userId: string }>({
      query: ({ userId }) => ({
        url: `users/contacts/${userId}/online`,
        method: "GET",
      }),
    }),
  }),
});
export const {
  useSendConnectionRequestMutation,
  useGetReceivedRequestsQuery,
  useGetSendRequestsQuery,
  useAcceptConnectionRequestMutation,
  useGetUserContactsQuery,
  useRejectConnectionRequestMutation,
  useGetOnlineContactsQuery,
} = userRequest;
