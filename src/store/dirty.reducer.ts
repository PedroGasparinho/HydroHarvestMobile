import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IsDirty = {
    dirty: boolean
}

const initialState: IsDirty = {
    dirty: false
}

const modelSlice = createSlice({
    name: "forecast",
    initialState,
    reducers: {
        setDirty: (state, action: PayloadAction<boolean>) => {
            state.dirty = action.payload;
        },
    }
});

export const { setDirty } = modelSlice.actions

export default modelSlice.reducer