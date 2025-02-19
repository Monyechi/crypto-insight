import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css";   // Tailwind
import "./app.css";     // Your custom #root styles
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
