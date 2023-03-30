import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {ServiceContextProvider} from './context/Context'
import "bootstrap/dist/css/bootstrap.css"
import"bootstrap/dist/js/bootstrap"
import {BrowserRouter} from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  <ServiceContextProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </ServiceContextProvider>
  
)
