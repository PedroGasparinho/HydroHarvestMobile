import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalState = {
    isVisible: boolean;
} 

const initialState: ModalState = {
    isVisible: false
}

const modelSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setVisible: (state, action: PayloadAction<boolean>) => {
            state.isVisible = action.payload;
        },
    }
});

export const {setVisible} = modelSlice.actions

export default modelSlice.reducer