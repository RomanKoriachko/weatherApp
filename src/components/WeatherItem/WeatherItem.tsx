import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { deliteCity, refreshData } from '../../redux/weatherDataReducer'
import './weatherItem.scss'

type WeatherProps = {
    id: number
    name: string
    main: {
        temp: number
    }
}

const WeatherItem = ({ name, main, id }: WeatherProps) => {
    const dispatch = useDispatch<AppDispatch>()

    return (
        <>
            <div>{name}</div>
            <div>{main.temp}</div>
            <button onClick={() => dispatch(refreshData({ id: id }))}>
                Обновить
            </button>
            <button onClick={() => dispatch(deliteCity({ id: id }))}>X</button>
        </>
    )
}

export default WeatherItem
