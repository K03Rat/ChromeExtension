import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import { fetchOpenWeatherData, OpenWeatherData } from '../../utils/api'
import { Card, CardContent, Box } from '@mui/material'
//import CardContent from '@mui/material/CardContent'

const WeatherCard: React.FC<{ city: string }> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOpenWeatherData(city)
        setWeatherData(data)
        console.log(data.main.temp)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [city]) // Correctly placed dependency array
  if (!weatherData) {
    return <div>Loading...</div>
  }

  // Component rendering logic here
  return (
    <Box mx={'4px'} my={'16px'}>
      <Card>
        <CardContent>
          <Typography variant="h5">{weatherData.name}</Typography>
          <Typography variant="body1">
            {Math.round(weatherData.main.temp)}
          </Typography>
          <Typography variant="body1">
            Feels like: {Math.round(weatherData.main.feels_like)}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default WeatherCard
