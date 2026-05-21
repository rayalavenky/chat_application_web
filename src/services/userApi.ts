import { api } from "./api";
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

interface UserSearch {
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

interface UserRequest {
  search?: UserSearch;
}

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({

    getUser : builder.query<UserResponse, UserRequest>({
      query: ({ search }) => ({
        url: `users`,
        params: search,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    
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
  useGetUserQuery,
  useLazyGetUserQuery,
  useGetUserByIdQuery,
  useUpdateUserProfileMutation,
} = userApi;