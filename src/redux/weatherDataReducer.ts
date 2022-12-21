import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

type WeatherType = {
    name: string
    main: {
        temp: number
    }
}
export type weatherDataType = {
    cities: WeatherType[],
    name: string,
    temp: number
    loading: boolean,
    error: null | string,
}

export const fetchWeather = createAsyncThunk(
    'weatherData/fetchWeather',
    async function(city: string){
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&limit=1&appid=0e51d6c96dee3098092c6bb492e3c800`)
        const data = await response.json();
        return data
    }
)

const initialState: weatherDataType = {
    cities: [],
    name: "",
    temp: 0,
    loading: false,
    error: null,
}

export const weatherDataReducer = createSlice({
    name:"weatherData",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(fetchWeather.fulfilled, (state, action) => {
            state.cities.push(action.payload)
        })
    }
})

export const {} = weatherDataReducer.actions

export default weatherDataReducer.reducer