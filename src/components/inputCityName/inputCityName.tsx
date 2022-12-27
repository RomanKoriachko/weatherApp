import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../redux/hooks'
import { AppDispatch } from '../../redux/store'
import { fetchWeather } from '../../redux/weatherDataReducer'

type Props = {}

const inputCityName = (props: Props) => {
    let weatherStoreData = useAppSelector((state) => state.weatherDataState)
    const dispatch = useDispatch<AppDispatch>()

    const [cityName, addCityName] = useState<string>('')

    const handleChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
        addCityName(e.target.value)
    }

    const onAddCityClick = () => {
        if (weatherStoreData.length === 0) {
            dispatch(fetchWeather(cityName))
            localStorage.setItem(
                'citiesLocalData',
                JSON.stringify(weatherStoreData)
            )
            addCityName('')
        } else {
            fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&limit=1&appid=0e51d6c96dee3098092c6bb492e3c800`
            )
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    for (let i = 0; i < weatherStoreData.length; i++) {
                        if (data.id === weatherStoreData[i].id) {
                            alert('Этот город уже добавлен')
                            addCityName('')
                        } else {
                            dispatch(fetchWeather(cityName))
                            localStorage.setItem(
                                'citiesLocalData',
                                JSON.stringify(weatherStoreData)
                            )
                            addCityName('')
                        }
                    }
                })
        }
    }

    return (
        <div>
            <input
                type="text"
                placeholder="город"
                value={cityName}
                onChange={handleChangeCity}
            />
            <button onClick={onAddCityClick}>Добавить</button>
        </div>
    )
}

export default inputCityName
