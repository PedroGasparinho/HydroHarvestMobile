import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getClosestRegionIdx } from "../utils/regions";

export type Location = {
    lat: number;
    lon: number;
}

export type UserLocation = {
    location: Location;
    closestRegionIdx: number;
} 

const initialState: UserLocation = {
    location: { lat: -1000, lon: -1000 },
    closestRegionIdx: 0,
}

const modelSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        setLocationReducer: (state, action: PayloadAction<Location>) => {
            state.location = action.payload;
            state.closestRegionIdx = getClosestRegionIdx(action.payload.lat, action.payload.lon);
        },
    }
});

export const { setLocationReducer } = modelSlice.actions

export default modelSlice.reducer