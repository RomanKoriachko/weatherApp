import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import WeatherItem from '../../components/WeatherItem/WeatherItem'
import { useAppSelector } from '../../redux/hooks'
import { AppDispatch } from '../../redux/store'
import { fetchWeather, weatherDataType } from '../../redux/weatherDataReducer'

type Props = {}
type WeatherType = {
    name: string
    main: {
        temp: number
    }
}

const Main = (props: Props) => {
    const [cityName, addCityName] = useState<string>('')
    const weatherStoreData = useAppSelector((state) => state.weatherDataState)
    const dispatch = useDispatch<AppDispatch>()

    const handleChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
        addCityName(e.target.value)
    }

    const onShowClick = () => {
        dispatch(fetchWeather(cityName))
    }

    // localStorage.setItem('weatherData', JSON.stringify(weatherStoreData))
    // const raw = localStorage.getItem('weatherData')
    // let weatherLocalData
    // if (raw) {
    //     weatherLocalData = JSON.parse(raw)
    // }
    // console.log(weatherLocalData)

    return (
        <div>
            <input
                type="text"
                placeholder="город"
                value={cityName}
                onChange={handleChangeCity}
            />
            <button onClick={onShowClick}>Добавить</button>
            <div>
                {weatherStoreData.cities.map(
                    ({ name, main }: WeatherType, i: number) => (
                        <div key={i}>
                            <WeatherItem name={name} main={main} />
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

export default Main
