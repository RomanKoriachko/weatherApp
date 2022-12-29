import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../redux/hooks'
import { AppDispatch } from '../../redux/store'
import { fetchWeather } from '../../redux/weatherDataReducer'

type Props = {}

const AddNewCity = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>()

    const [cityName, addCityName] = useState<string>('')
    const duplicates: boolean[] = []
    let weatherStoreData = useAppSelector((state) => state.weatherDataState)

    const handleChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
        addCityName(e.target.value)
    }

    const onAddCityClick = () => {
        if (cityName === '') {
            alert('Поле не должно быть пустым')
        } else {
            fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&limit=1&appid=0e51d6c96dee3098092c6bb492e3c800`
            )
                .then((response) => response.json())
                .then((data) => {
                    for (let i = 0; i < weatherStoreData.length; i++) {
                        if (weatherStoreData[i].id === data.id) {
                            duplicates.push(true)
                        } else {
                            duplicates.push(false)
                        }
                    }
                    if (duplicates.includes(true)) {
                        alert('Город уже добавлен')
                        addCityName('')
                    } else {
                        dispatch(fetchWeather(cityName))
                        addCityName('')
                    }
                })
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
