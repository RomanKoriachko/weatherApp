import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AddNewCity from '../../components/AddNesCity/AddNewCity'
import WeatherItem from '../../components/WeatherItem/WeatherItem'
import { useAppSelector } from '../../redux/hooks'
import { AppDispatch } from '../../redux/store'
import { deliteCity, fetchWeather } from '../../redux/weatherDataReducer'

type Props = {}
type WeatherType = {
    id: number
    name: string
    main: {
        temp: number
    }
}

const Main = (props: Props) => {
    let weatherStoreData = useAppSelector((state) => state.weatherDataState)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        getlocalData()
    }, [])

    const getlocalData = () => {
        const raw = localStorage.getItem('citiesLocalData')
        let citiesLocalData: WeatherType[]
        if (raw) {
            citiesLocalData = JSON.parse(raw)
            for (let i = 0; i < 1; i++) {
                citiesLocalData.map((element) => {
                    dispatch(fetchWeather(element.name))
                })
            }
            console.log(citiesLocalData)
        }
    }

    console.log(weatherStoreData.cities)

    // localStorage.clear()

    return (
        <div>
            <AddNewCity />
            <div>
                {weatherStoreData.cities.map(
                    ({ name, main, id }: WeatherType) => (
                        <div key={id}>
                            <WeatherItem name={name} main={main} id={id} />
                            <button
                                onClick={() => dispatch(deliteCity({ id: id }))}
                            >
                                delite
                            </button>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

export default Main
