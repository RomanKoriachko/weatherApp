import Grid from '@mui/material/Grid'
import { Container } from '@mui/system'
import AddNewCity from '../../components/AddNesCity/AddNewCity'
import WeatherItem from '../../components/WeatherItem/WeatherItem'
import { useAppSelector } from '../../redux/hooks'

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

const Main = (props: Props) => {
    let weatherStoreData = useAppSelector((state) => state.weatherDataState)

    // localStorage.clear()

    return (
        <Container>
            <div className="container">
                <AddNewCity />
                <div>
                    <Grid
                        container
                        spacing={2}
                        style={{
                            marginTop: 50,
                        }}
                    >
                        {weatherStoreData.map(
                            ({
                                name,
                                main,
                                id,
                                weather,
                                wind,
                            }: WeatherType) => (
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
                </div>
            </div>
        </Container>
    )
}

export default Main
