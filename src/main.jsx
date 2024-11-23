import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Dataprovider from './context.jsx/Dataprovider.jsx'

createRoot(document.getElementById('root')).render(
  <Dataprovider>
  <StrictMode>
    <App />
  </StrictMode>
  </Dataprovider>
)
