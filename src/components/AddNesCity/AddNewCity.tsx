import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { fetchWeather } from '../../redux/weatherDataReducer'

type Props = {}

const AddNewCity = (props: Props) => {
    const dispatch = useAppDispatch()

    const [cityName, addCityName] = useState<string>('')
    const duplicates: boolean[] = []
    let weatherStoreData = useAppSelector((state) => state.weatherDataState)

    const handleChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
        addCityName(e.target.value)
    }

    const onAddCityClick = () => {
        if (cityName === '') {
            alert('Поле не має бути порожнім')
        } else {
            fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&limit=1&appid=0e51d6c96dee3098092c6bb492e3c800`
            )
                .then((response) => response.json())
                .then((response) => {
                    if (response.cod === '404') {
                        alert('Такого міста не існує')
                    } else {
                        return response
                    }
                })
                .then((data) => {
                    for (let i = 0; i < weatherStoreData.length; i++) {
                        if (weatherStoreData[i].id === data.id) {
                            duplicates.push(true)
                        } else {
                            duplicates.push(false)
                        }
                    }
                    if (duplicates.includes(true)) {
                        alert('Місто вже додано')
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
                label="Місто"
                variant="outlined"
                value={cityName}
                onChange={handleChangeCity}
            />
            <Button
                variant="outlined"
                onClick={onAddCityClick}
                style={{
                    height: '56px',
                    marginLeft: '10px',
                }}
            >
                Додати
            </Button>
        </>
    )
}

export default AddNewCity
