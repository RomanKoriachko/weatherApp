import { Container } from '@mui/system'
import AddNewCity from '../../components/AddNesCity/AddNewCity'
import WeatherSection from '../../components/WeatherSection/WeatherSection'

type Props = {}

const Main = (props: Props) => {
    return (
        <Container>
            <AddNewCity />
            <WeatherSection />
        </Container>
    )
}

export default Main
