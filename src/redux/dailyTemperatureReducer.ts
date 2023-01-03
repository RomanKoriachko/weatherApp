import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

type TemperatureType = {
    list: [
        {
            main: {
                temp: number
            }
        }
    ]
}

export const fetchTemperature = createAsyncThunk(
    'dailyTemperature/fetchTemperature',
    async function(city: string){
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=0e51d6c96dee3098092c6bb492e3c800`)
        const data = await response.json();
        return data
    }
)

const initialState: TemperatureType[] = []

export const dailyTemperatureReducer = createSlice({
    name:"dailyTemperature",
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchTemperature.fulfilled, (state, action) => {
            state.splice(0, state.length)
            state.push(action.payload)
        })
    }
})

export default dailyTemperatureReducer.reducer