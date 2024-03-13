import React from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/roboto'
import WeatherCard from './WeatherCard'
import './popup.css'

const Popup: React.FC<{}> = () => {
  return (
    <div>
      <WeatherCard city="Galway" />
      <WeatherCard city="Dublin" />
    </div>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<Popup />)

export default Popup
