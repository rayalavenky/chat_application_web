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
export interface UsersData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  age: number;
  bio?: string;
}

interface UsersResponse {
  data: UsersData[];
  message: string;
  status: string;
}

interface UserResponse {
  data: UserData;
  message: string;
  status: string;
}

interface UserRequest {
  search?: any;
}

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({

    getUsers : builder.query<UsersResponse, UserRequest>({
      query: ({ search }) => ({
        url: `users`,
        params: { search },
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
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserProfileMutation,
} = userApi;