import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import './styles/transitions.css'
import './styles/flat-bar.css'
import './styles/b3-craft.css'
import './styles/b4-integrity.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
