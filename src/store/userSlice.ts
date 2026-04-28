import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    userData: any;
    accessToken: string;
    refreshToken: string;
}

const initialState: UserState = {
    userData: null,
    accessToken: "",
    refreshToken : ""
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser : (state, action: PayloadAction<{userData: any, accessToken: string, refreshToken: string}>)=> {
            state.userData = action.payload.userData;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken
        },

        clearUser: (state) => {
            state.userData = null;
            state.accessToken = "";
            state.refreshToken = "";
        }
    }
})

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;