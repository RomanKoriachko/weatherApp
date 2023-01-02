import { configureStore } from "@reduxjs/toolkit";
import dailyTemperatureReducer from "./dailyTemperatureReducer";
import weatherDataReducer from "./weatherDataReducer";

export const store = configureStore({
    reducer: {
        weatherDataState: weatherDataReducer,
        dailyTemperatureState: dailyTemperatureReducer,
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
