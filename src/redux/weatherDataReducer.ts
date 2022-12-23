import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

type WeatherType = {
    id: number
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
    reducers:{
        deliteCity: (state, action) => {
            for(let i = 0; i < state.cities.length; i++) {
                if(action.payload.id === state.cities[i].id) {
                    state.cities.splice(i, 1)
                    localStorage.setItem("citiesLocalData", JSON.stringify(state.cities))
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchWeather.fulfilled, (state, action) => {
            state.cities.push(action.payload)
            localStorage.setItem("citiesLocalData", JSON.stringify(state.cities))
        })
    }
})

export const {deliteCity} = weatherDataReducer.actions

export default weatherDataReducer.reducer