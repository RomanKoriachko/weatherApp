import { fetchTemperature } from "./dailyTemperatureReducer"

global.fetch = jest.fn()

describe('fetchTemperature thunk testing', () => {
    it('Temperature resolved response', async() => {
        const mockTemperature = [{
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
            json: () => Promise.resolve(mockTemperature)
        })

        const dispatch = jest.fn()
        const thunk = fetchTemperature("lviv")

        await thunk(dispatch, () => ({}), null)

        const {calls} = dispatch.mock
        expect(calls).toHaveLength(2)

        const [start, end] = calls
        expect(start[0].type).toBe('dailyTemperature/fetchTemperature/pending')
        expect(end[0].type).toBe('dailyTemperature/fetchTemperature/fulfilled')
        expect(end[0].payload).toBe(mockTemperature)
    })
})