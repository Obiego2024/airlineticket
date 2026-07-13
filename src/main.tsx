import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { UiProvider } from './context/UiContext'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <UiProvider>
      <App />
    </UiProvider>
  </BrowserRouter>,
)
