type WeatherProps = {
    name: string
    main: {
        temp: number
    }
}

const WeatherItem = ({ name, main }: WeatherProps) => {
    return (
        <>
            <div>{name}</div>
            <div>{main.temp}</div>
        </>
    )
}

export default WeatherItem
