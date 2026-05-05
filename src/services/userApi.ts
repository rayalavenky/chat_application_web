import { api } from "./api";

interface UserRequest {
  id: string;
}

interface UserResponse {
  data: {
    user: { id: string; firstName: string; lastName: string; email: string };
    accessToken: string;
    refreshToken: string;
    };
    message: string;
    status: string;
}


export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
     user: builder.mutation<UserResponse, UserRequest>({
          query: ({id}) => ({
            url: `users/${id}`,
            method: "GET",
          }),
        }),
  }),
});


export const { useUserMutation } = userApi;