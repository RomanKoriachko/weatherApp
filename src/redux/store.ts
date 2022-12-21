import { configureStore } from "@reduxjs/toolkit";
import weatherDataReducer from "./weatherDataReducer";

export const store = configureStore({
    reducer: {
        weatherDataState: weatherDataReducer,
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
