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
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks'
import { fetchTemperature } from '../../redux/dailyTemperatureReducer'

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

    async function onRefreshClick(city: string) {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&limit=1&appid=0e51d6c96dee3098092c6bb492e3c800`
        )
        const data = await response.json()
        dispatch(
            refreshData({
                icon: data.weather[0].icon,
                name: data.name,
                temp: data.main.temp,
                deg: data.wind.deg,
                speed: data.wind.speed,
            })
        )
    }

    let weatherStoreData = useAppSelector((state) => state.weatherDataState)

    return (
        <Card>
            <Link
                to={`/${name}`}
                style={{
                    textDecoration: 'none',
                    color: 'black',
                }}
                onClick={() => dispatch(fetchTemperature(name))}
            >
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
                    <Typography variant="h4">Місто: {name}</Typography>
                    <Typography variant="h5">
                        Температура: {main.temp} °С
                    </Typography>
                    <Typography variant="h5">
                        Швидкість вітру: {wind.speed} м/с
                    </Typography>
                    <Typography variant="h5">
                        Напрям вітру: {wind.deg}°
                    </Typography>
                </CardContent>
            </Link>
            <CardActions>
                <Button
                    onClick={() => onRefreshClick(name)}
                    variant="contained"
                >
                    Оновити
                </Button>
                <Button
                    onClick={() => dispatch(deliteCity({ id: id }))}
                    variant="contained"
                    disabled={weatherStoreData.length === 1}
                >
                    Видалити
                </Button>
            </CardActions>
        </Card>
    )
}

export default WeatherItem
