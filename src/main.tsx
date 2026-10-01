import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ensureLanguage, initialLang } from './i18n'
import './index.css'
import App from './App.tsx'

// Hindi pages need their translations before the first render (the
// prerendered HTML stays on screen meanwhile, so nothing flashes).
ensureLanguage(initialLang)
  .catch(() => { /* fall back to English text rather than not rendering */ })
  .finally(() => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  })
