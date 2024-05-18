import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalState = {
    isVisible: boolean;
} 

const initialState: ModalState = {
    isVisible: false
}

const pantrySlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setVisible: (state, action: PayloadAction<boolean>) => {
            state.isVisible = action.payload;
        },
    }
});

export const {setVisible} = pantrySlice.actions

export default pantrySlice.reducer