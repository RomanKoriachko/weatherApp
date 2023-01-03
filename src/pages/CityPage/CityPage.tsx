import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks'
import './CityPage.scss'

type Props = {}

type TemperatureItemType = {
    main: {
        temp: number
    }
}

type WeatherType = {
    id: number
    name: string
    main: {
        temp: number
        temp_max: number
        temp_min: number
        pressure: number
        humidity: number
        feels_like: number
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

type TemperatureItemStyleType = ItemStyle[]
type ItemStyle = {
    marginBottom: string
    background?: string
    color?: string
}

type LocalTemperatureType = TemperatureItemType[]

const CityPage = (props: Props) => {
    const { cityName } = useParams()

    let weatherStoreData = useAppSelector((state) => state.weatherDataState)
    let temperatureArr = useAppSelector((state) => state.dailyTemperatureState)

    let currentCityData: WeatherType | null = null
    for (let i = 0; i < weatherStoreData.length; i++) {
        if (weatherStoreData[i].name === cityName) {
            currentCityData = weatherStoreData[i]
        }
    }

    let dailyTemperature

    if (temperatureArr.length > 0) {
        dailyTemperature = temperatureArr[0].list
        localStorage.setItem(
            'dailyTemperature',
            JSON.stringify(dailyTemperature)
        )
    }

    const raw = localStorage.getItem('dailyTemperature')
    let localDatatemperature: LocalTemperatureType = []
    if (raw) {
        localDatatemperature = JSON.parse(raw)
    }

    const filtredlocalData = localDatatemperature.splice(0, 20)

    const currentTempArray = []
    for (let i = 0; i < filtredlocalData.length; i++) {
        currentTempArray.push(Math.round(filtredlocalData[i].main.temp))
    }

    const maxTemp = Math.max.apply(null, currentTempArray)
    const minTemp = Math.min.apply(null, currentTempArray)
    const average = Math.round((maxTemp + minTemp) / 2)

    let temperatureItemStyle: TemperatureItemStyleType = []
    for (let i = 0; i < filtredlocalData.length; i++) {
        temperatureItemStyle.unshift({
            marginBottom: '0px',
        })
    }

    for (let i = 0; i < currentTempArray.length; i++) {
        temperatureItemStyle[i].marginBottom = `${
            (currentTempArray[i] - average) * 10
        }px`
        if (currentTempArray[i] > 30) {
            temperatureItemStyle[i].background = '#FF4500'
        } else if (currentTempArray[i] > 20 && currentTempArray[i] <= 30) {
            temperatureItemStyle[i].background = '#FF7F50'
        } else if (currentTempArray[i] > 10 && currentTempArray[i] <= 20) {
            temperatureItemStyle[i].background = '#FA8072'
        } else if (currentTempArray[i] > 0 && currentTempArray[i] <= 10) {
            temperatureItemStyle[i].background = '#FFA07A'
        } else if (currentTempArray[i] > -10 && currentTempArray[i] <= 0) {
            temperatureItemStyle[i].background = '#E0FFFF'
        } else if (currentTempArray[i] > -20 && currentTempArray[i] <= -10) {
            temperatureItemStyle[i].background = '#87CEFA'
        } else if (currentTempArray[i] > -30 && currentTempArray[i] <= -20) {
            temperatureItemStyle[i].background = '#00BFFF'
        } else if (currentTempArray[i] <= -30) {
            temperatureItemStyle[i].background = '#0000FF'
            temperatureItemStyle[i].color = 'white'
        }
    }

    return (
        <Container>
            <Card
                style={{
                    marginBottom: '20px',
                }}
            >
                <CardMedia
                    component="img"
                    alt="weather image"
                    height="200"
                    image={`https://openweathermap.org/img/w/${currentCityData?.weather[0].icon}.png`}
                    style={{
                        objectFit: 'contain',
                    }}
                />
                <CardContent>
                    <Typography variant="h3">
                        Місто: {currentCityData?.name}
                    </Typography>
                    <Typography variant="h3">
                        {currentCityData?.weather[0].description}
                    </Typography>
                </CardContent>
            </Card>
            <Card
                style={{
                    marginBottom: '20px',
                }}
            >
                <CardContent>
                    <Typography variant="h4">
                        Температура:{' '}
                        {currentCityData
                            ? Math.round(currentCityData.main.temp)
                            : undefined}
                        °С
                    </Typography>
                    <Typography variant="h4">
                        Відчувається як:{' '}
                        {currentCityData
                            ? Math.round(currentCityData?.main.feels_like)
                            : undefined}
                        °С
                    </Typography>
                    <Typography variant="h4">
                        Максимальна температура:{' '}
                        {currentCityData
                            ? Math.round(currentCityData?.main.temp_max)
                            : undefined}
                        °С
                    </Typography>
                    <Typography variant="h4">
                        Мінімальна температура:{' '}
                        {currentCityData
                            ? Math.round(currentCityData?.main.temp_min)
                            : undefined}
                        °С
                    </Typography>
                    <Typography
                        variant="h4"
                        style={{
                            marginBottom: '20px',
                        }}
                    >
                        Погодинний графік температури
                    </Typography>
                    <Grid
                        className="temperature-wrapper"
                        container
                        flexWrap="nowrap"
                        justifyContent="center"
                        alignItems="center"
                        spacing={1}
                    >
                        {currentTempArray.map((temp: number, i: number) => (
                            <Grid
                                item
                                key={i}
                                className="temperature-item"
                                style={temperatureItemStyle[i]}
                            >
                                {Math.round(temp) > 0
                                    ? '+' + Math.round(temp)
                                    : Math.round(temp)}
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>
            <Card
                style={{
                    marginBottom: '20px',
                }}
            >
                <CardContent>
                    <Typography variant="h4">
                        Швидкість вітру: {currentCityData?.wind.speed} м/с
                    </Typography>
                    <Typography variant="h4">
                        Напрям вітру: {currentCityData?.wind.deg}°
                    </Typography>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <Typography variant="h4">
                        Атмосферний тиск: {currentCityData?.main.pressure} Pa
                    </Typography>
                    <Typography variant="h4">
                        Вологість: {currentCityData?.main.humidity} %
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    )
}

export default CityPage
