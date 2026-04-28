import { createSlice , PayloadAction} from "@reduxjs/toolkit";

const forgotEmailSlice = createSlice({
    name: 'forgotPassword',
    initialState: { email: "" },
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        clearEmail: (state) => {
            state.email = "";
        }
    }
})

export const { setEmail, clearEmail } = forgotEmailSlice.actions;
export default forgotEmailSlice.reducer;