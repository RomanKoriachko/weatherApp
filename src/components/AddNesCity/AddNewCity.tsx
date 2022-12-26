import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { fetchWeather } from '../../redux/weatherDataReducer'

type Props = {}

const AddNewCity = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>()

    const [cityName, addCityName] = useState<string>('')

    const handleChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
        addCityName(e.target.value)
    }

    const onAddCityClick = () => {
        if (cityName === '') {
            alert('Поле не должно быть пустым')
        } else {
            dispatch(fetchWeather(cityName))
            addCityName('')
        }
    }

    return (
        <>
            <TextField
                id="outlined-basic"
                label="Город"
                variant="outlined"
                value={cityName}
                onChange={handleChangeCity}
            />
            <Button variant="outlined" onClick={onAddCityClick}>
                Добавить
            </Button>
        </>
    )
}

export default AddNewCity
