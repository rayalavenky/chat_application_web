import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    userData: any;
    token: string;
}

const initialState: UserState = {
    userData: null,
    token: ""
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser : (state, action: PayloadAction<{userData: any, token: string}>)=> {
            state.userData = action.payload.userData;
            state.token = action.payload.token;
        },

        clearUser: (state) => {
            state.userData = null;
            state.token = "";
        }
    }
})

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;