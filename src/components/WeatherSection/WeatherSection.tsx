import { Grid } from '@mui/material'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import WeatherItem from '../../components/WeatherItem/WeatherItem'
import { deliteData, fetchWeather } from '../../redux/weatherDataReducer'

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

const WeatherSection = (props: Props) => {
    let weatherStoreData = useAppSelector((state) => state.weatherDataState)
    const dispatch = useAppDispatch()

    let citiesArr: string[] = []

    useEffect(() => {
        dispatch(deliteData())
        for (let i = 0; i < citiesArr.length; i++) {
            dispatch(fetchWeather(citiesArr[i]))
        }
    }, [])

    for (let i = 0; i < weatherStoreData.length; i++) {
        citiesArr.push(weatherStoreData[i].name)
    }

    return (
        <Grid
            className="weather-section"
            container
            spacing={2}
            style={{
                marginTop: 50,
            }}
        >
            {weatherStoreData.map(
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
    )
}

export default WeatherSection
