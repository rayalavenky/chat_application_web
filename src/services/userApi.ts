import { api } from "./api";

interface UserRequest {
  id: string;
}

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  age: number;
  bio?: string;
}

interface UserResponse {
  data: UserData;
  message: string;
  status: string;
}

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    
    // ✅ GET USER (use query, not mutation)
    getUserById: builder.query<UserResponse, { id: string }>({
      query: ({ id }) => ({
        url: `users/${id}`,
        method: "GET",
      }),
      providesTags: ["UserProfile"],
    }),

    // ✅ UPDATE PROFILE
    updateUserProfile: builder.mutation<UserResponse, Partial<UserData>>({
      query: (data) => ({
        url: "users/update",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["UserProfile"],
    }),

  }),
});

export const {
  useGetUserByIdQuery,
  useUpdateUserProfileMutation,
} = userApi;