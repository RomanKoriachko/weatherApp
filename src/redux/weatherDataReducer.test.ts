import weatherDataReducer, { deliteCity, deliteData, refreshData, WeatherType } from "./weatherDataReducer"

let state: WeatherType[]

beforeEach(() => {
    state = [
        {
            id: 1,
            name: "Lviv", 
            main: {
                temp: 70,
                temp_max: 70,
                temp_min: 50,
                pressure: 10,
                humidity: 20,
                feels_like: 30,
            },
            weather: [
                {
                    main: "bla",
                    icon: "blabla",
                    description: "blablabla",
                }
            ],
            wind: {
                deg: 50,
                speed: 20,
            }
        },
        {
            id: 2,
            name: "Kharkiv", 
            main: {
                temp: 50,
                temp_max: 30,
                temp_min: 40,
                pressure: 10,
                humidity: 20,
                feels_like: 30,
            },
            weather: [
                {
                    main: "bla",
                    icon: "blabla",
                    description: "blablabla",
                }
            ],
            wind: {
                deg: 10,
                speed: 30,
            }
        },
    ]
})

test('cheking delite city reducer', () => {
    const newState = weatherDataReducer(state, deliteCity({id: 1}))
    expect(newState).toStrictEqual([{
        id: 2,
            name: "Kharkiv", 
            main: {
                temp: 50,
                temp_max: 30,
                temp_min: 40,
                pressure: 10,
                humidity: 20,
                feels_like: 30,
            },
            weather: [
                {
                    main: "bla",
                    icon: "blabla",
                    description: "blablabla",
                }
            ],
            wind: {
                deg: 10,
                speed: 30,
            }
    }])


})

test('cheking refresh reducer', () => {
    const newState = weatherDataReducer(state, refreshData({
        icon: "icon",
        name: "Lviv",
        temp: 22,
        deg: 33,
        speed: 44,
    }))
    expect(newState).toStrictEqual([
        {
            id: 1,
            name: "Lviv", 
            main: {
                temp: 22,
                temp_max: 70,
                temp_min: 50,
                pressure: 10,
                humidity: 20,
                feels_like: 30,
            },
            weather: [
                {
                    main: "bla",
                    icon: "icon",
                    description: "blablabla",
                }
            ],
            wind: {
                deg: 33,
                speed: 44,
            }
        },
        {
            id: 2,
            name: "Kharkiv", 
            main: {
                temp: 50,
                temp_max: 30,
                temp_min: 40,
                pressure: 10,
                humidity: 20,
                feels_like: 30,
            },
            weather: [
                {
                    main: "bla",
                    icon: "blabla",
                    description: "blablabla",
                }
            ],
            wind: {
                deg: 10,
                speed: 30,
            }
        },
    ])


})

test('cheking delite data reducer', () => {
    const newState = weatherDataReducer(state, deliteData())
    expect(newState).toStrictEqual([])
})