import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Fonts are bundled with the site so no request goes to Google (GDPR).
import '@fontsource/alfa-slab-one/400.css'
import '@fontsource/kaushan-script/400.css'
import '@fontsource/karla/400.css'
import '@fontsource/karla/600.css'
import '@fontsource/karla/700.css'
import '@fontsource/karla/800.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
