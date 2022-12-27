import { Link, useParams } from 'react-router-dom'

type Props = {}

const CityPage = (props: Props) => {
    const { cityName } = useParams()

    let currentCityData

    return <div>{cityName}</div>
}

export default CityPage
