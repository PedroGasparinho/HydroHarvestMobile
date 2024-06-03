import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Location = {
    lat: number;
    lon: number;
}

export type UserLocation = {
    location: Location;
} 

const initialState: UserLocation = {
    location: { lat: 1, lon: 1 }
}

const modelSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        setLocationReducer: (state, action: PayloadAction<Location>) => {
            state.location = action.payload;
        },
    }
});

export const { setLocationReducer } = modelSlice.actions

export default modelSlice.reducer