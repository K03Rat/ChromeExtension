import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import {
  fetchOpenWeatherData,
  OpenWeatherData,
  OpenWeatherTempScale,
} from '../../utils/api'
import { Card, Button, CardContent, Box, CardActions } from '@mui/material'

const WeatherCardConatainer: React.FC<{
  children: React.ReactNode
  onDelete?: () => void
}> = ({ children, onDelete }) => {
  return (
    <Box mx={'4px'} my={'16px'}>
      <Card>
        <CardContent>{children}</CardContent>
        <CardActions>
          {onDelete && (
            <Button color="secondary" onClick={onDelete}>
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  )
}
type WeatherCardState = 'loading' | 'error' | 'ready'
const WeatherCard: React.FC<{
  city: string
  tempScale: OpenWeatherTempScale
  onDelete?: () => void
}> = ({ city, tempScale, onDelete }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null)
  const [cardState, setCardState] = useState<WeatherCardState>('loading')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOpenWeatherData(city, tempScale)
        setWeatherData(data)
        setCardState('ready')
        console.log(data.main.temp)
      } catch (err) {
        setCardState('error')
        console.log(err)
      }
    }

    fetchData()
  }, [city, tempScale])
  if (cardState == 'loading' || cardState == 'error') {
    return (
      <WeatherCardConatainer onDelete={onDelete}>
        <Typography variant="body1">
          {cardState == 'loading'
            ? 'Loading...'
            : 'Error: could not retrieve weather data from this city'}
        </Typography>
      </WeatherCardConatainer>
    )
  }

  return (
    <WeatherCardConatainer onDelete={onDelete}>
      <Typography variant="h5">{weatherData.name}</Typography>
      <Typography variant="body1">
        {Math.round(weatherData.main.temp)}
      </Typography>
      <Typography variant="body1">
        Feels like: {Math.round(weatherData.main.feels_like)}
      </Typography>
    </WeatherCardConatainer>
  )
}

export default WeatherCard
