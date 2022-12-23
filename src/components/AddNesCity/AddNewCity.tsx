import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../redux/hooks'
import { AppDispatch } from '../../redux/store'
import { fetchWeather } from '../../redux/weatherDataReducer'

type Props = {}

const AddNewCity = (props: Props) => {
    let weatherStoreData = useAppSelector((state) => state.weatherDataState)
    const dispatch = useDispatch<AppDispatch>()

    const [cityName, addCityName] = useState<string>('')

    const handleChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
        addCityName(e.target.value)
    }

    const onAddCityClick = () => {
        dispatch(fetchWeather(cityName))
        addCityName('')
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

export default AddNewCity
