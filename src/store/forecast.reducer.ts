import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Forecast } from "../utils/domain";

type SavedForecast = {
    forecast: Forecast | undefined,
    lastUpdated: Date,
    regionIdx: number,
} 

export type ForecastReducer = {
    latestForecast: SavedForecast;
    closestForecast: SavedForecast;
} 

const initialState: ForecastReducer = {
    latestForecast: {
        forecast: undefined,
        lastUpdated: new Date(),
        regionIdx: 0,
    },
    closestForecast: {
        forecast: undefined,
        lastUpdated: new Date(),
        regionIdx: 0,
    },
}

const modelSlice = createSlice({
    name: "forecast",
    initialState,
    reducers: {
        setLatestForecast: (state, action: PayloadAction<SavedForecast>) => {
            state.latestForecast = action.payload;
        },
        setClosestForecast: (state, action: PayloadAction<SavedForecast>) => {
            state.closestForecast = action.payload;
        },
    }
});

export const { setLatestForecast, setClosestForecast } = modelSlice.actions

export default modelSlice.reducer