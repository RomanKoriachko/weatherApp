import { fetchWeather } from "./weatherDataReducer"

global.fetch = jest.fn()

describe('fetchWeather thunk testing', () => {
    it('resolved response', async() => {
        const mockWeather = [{
            id: 1,
            name: "Lviv",
            main: {
                temp: 10,
                temp_max: 12,
                temp_min: 7,
                pressure: 1000,
                humidity: 50,
                feels_like: 10,
            },
            weather: [
                {
                    main: 'string',
                    icon: 'string',
                    description: 'string',
                }
            ],
            wind: {
                deg: 10,
                speed: 20,
            }
        }]

        /* @ts-ignore*/ 
        fetch.mockResolvedValue({
            json: () => Promise.resolve(mockWeather)
        })

        const dispatch = jest.fn()
        const thunk = fetchWeather("lviv")

        await thunk(dispatch, () => ({}), null)

        const {calls} = dispatch.mock
        expect(calls).toHaveLength(2)

        const [start, end] = calls
        expect(start[0].type).toBe('weatherData/fetchWeather/pending')
        expect(end[0].type).toBe('weatherData/fetchWeather/fulfilled')
        expect(end[0].payload).toBe(mockWeather)
    })

    it('rejected response', async() => {
        /* @ts-ignore*/ 
        fetch.mockResolvedValue(false)

        const dispatch = jest.fn()
        const thunk = fetchWeather("lviv")

        await thunk(dispatch, () => ({}), null)

        const {calls} = dispatch.mock
        expect(calls).toHaveLength(2)

        const [start, end] = calls

        expect(start[0].type).toBe('weatherData/fetchWeather/pending')
        expect(end[0].type).toBe('weatherData/fetchWeather/rejected')
    })
})