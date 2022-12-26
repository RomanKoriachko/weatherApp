import { Button, Card, Typography } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { deliteCity, refreshData } from '../../redux/weatherDataReducer'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

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

const WeatherItem = ({ name, main, id, weather, wind }: WeatherType) => {
    const dispatch = useDispatch<AppDispatch>()

    return (
        <Card>
            <CardMedia
                className="weather-img"
                component="img"
                alt="weather image"
                height="120"
                image={`https://openweathermap.org/img/w/${weather[0].icon}.png`}
                style={{
                    objectFit: 'contain',
                }}
            />
            <CardContent>
                <Typography variant="h4">Город: {name}</Typography>
                <Typography variant="h5">Температура: {main.temp}°С</Typography>
                <Typography variant="h5">
                    Скорость ветра: {wind.speed}
                </Typography>
                <Typography variant="h5">
                    Направление ветра: {wind.deg}°
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    onClick={() => dispatch(refreshData({ id: id }))}
                    variant="contained"
                >
                    Обновить
                </Button>
                <Button
                    onClick={() => dispatch(deliteCity({ id: id }))}
                    variant="contained"
                >
                    Удалить
                </Button>
            </CardActions>
        </Card>
    )
}

export default WeatherItem
