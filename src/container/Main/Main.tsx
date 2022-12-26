import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import AddNewCity from '../../components/AddNesCity/AddNewCity'
import WeatherItem from '../../components/WeatherItem/WeatherItem'
import { useAppSelector } from '../../redux/hooks'
import { AppDispatch } from '../../redux/store'
import { fetchWeather } from '../../redux/weatherDataReducer'
import './Main.scss'

type Props = {}
type WeatherType = {
    id: number
    name: string
    main: {
        temp: number
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

const Main = (props: Props) => {
    useEffect(() => {
        getlocalData()
    }, [])

    const getlocalData = () => {
        const raw = localStorage.getItem('citiesLocalData')
        let citiesLocalData: WeatherType[]
        if (raw) {
            citiesLocalData = JSON.parse(raw)
            for (let i = 0; i < 1; i++) {
                citiesLocalData.map((element) => {
                    dispatch(fetchWeather(element.name))
                })
            }
            // console.log(citiesLocalData)
        }
    }

    let weatherStoreData = useAppSelector((state) => state.weatherDataState)
    const dispatch = useDispatch<AppDispatch>()

    console.log(weatherStoreData.cities)

    // localStorage.clear()

    return (
        <div className="container">
            <AddNewCity />
            <div>
                <Grid
                    container
                    spacing={2}
                    style={{
                        marginTop: 50,
                    }}
                >
                    {weatherStoreData.cities.map(
                        ({ name, main, id, weather, wind }: WeatherType) => (
                            <Grid item xs={4} key={id}>
                                <WeatherItem
                                    name={name}
                                    main={main}
                                    id={id}
                                    weather={weather}
                                    wind={wind}
                                />
                            </Grid>
                        )
                    )}
                </Grid>
            </div>
        </div>
    )
}

export default Main
