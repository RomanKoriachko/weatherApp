import Main from '../Main/Main'
import { Routes, Route } from 'react-router-dom'
import CityPage from '../../pages/CityPage/CityPage'

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/:cityName" element={<CityPage />} />
            </Routes>
        </div>
    )
}

export default App
