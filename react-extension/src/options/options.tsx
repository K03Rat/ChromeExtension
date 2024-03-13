import React from 'react'
import { createRoot } from 'react-dom/client'
import './options.css'

const test = (
  <img
    src="logo.png"
    style={{
      width: 300,
    }}
  />
)

const root = document.createElement('div')
document.body.appendChild(root)
const rootElement = createRoot(root)
rootElement.render(test)
