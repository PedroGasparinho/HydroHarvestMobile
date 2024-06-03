import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
    id: string;
    name: string;
    email: string;
    photo: string;
    password: string;
}

export type UserLogin = {
    user: User | null;
} 

const initialState: UserLogin = {
    user: null
}

const modelSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
    }
});

export const { setUser, logout } = modelSlice.actions

export default modelSlice.reducer