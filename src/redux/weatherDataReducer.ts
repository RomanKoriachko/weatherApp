import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

type WeatherType = {
    id: number
    name: string
    main: {
        temp: number
        temp_max: number
        temp_min: number
        pressure: number
        humidity: number
        feels_like: number
    }
    weather: weatherArrayType[]
    wind: {
        deg: number
        speed: number
    }
}
type weatherArrayType = {
    main: string
    icon: string
    description: string
}

export const fetchWeather = createAsyncThunk(
    'weatherData/fetchWeather',
    async function(city: string){
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&limit=1&appid=0e51d6c96dee3098092c6bb492e3c800`)
        const data = await response.json();
        return data
    }
)

const raw = localStorage.getItem('citiesLocalData')
let citiesLocalData: WeatherType[] = []
if (raw) {
    citiesLocalData = JSON.parse(raw)
}

const initialState: WeatherType[] = citiesLocalData

export const weatherDataReducer = createSlice({
    name:"weatherData",
    initialState,
    reducers:{
        deliteCity: (state, action) => {
            for(let i = 0; i < state.length; i++) {
                if(action.payload.id === state[i].id) {
                    state.splice(i, 1)
                    localStorage.setItem("citiesLocalData", JSON.stringify(state))
                }
            }
        },
        refreshData: (state, action) => {
            for(let i = 0; i < state.length; i++) {
                if(action.payload.name === state[i].name) {
                    state[i].weather[0].icon = action.payload.icon
                    state[i].main.temp = action.payload.temp
                    state[i].wind.deg = action.payload.deg
                    state[i].wind.speed = action.payload.speed
                }
            }
            localStorage.setItem("citiesLocalData", JSON.stringify(state))
        },
        deliteData: (state) => {
            state.splice(0, state.length)
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchWeather.fulfilled, (state, action) => {
            state.push(action.payload)
            localStorage.setItem("citiesLocalData", JSON.stringify(state))
        })
    }
})

export const {deliteCity, refreshData, deliteData} = weatherDataReducer.actions

export default weatherDataReducer.reducer