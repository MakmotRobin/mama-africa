// Fonts are bundled with the site so no request goes to Google (GDPR).
import '@fontsource/alfa-slab-one/400.css'
import '@fontsource/kaushan-script/400.css'
import '@fontsource/karla/400.css'
import '@fontsource/karla/600.css'
import '@fontsource/karla/700.css'
import '@fontsource/karla/800.css'
import './index.css'
import { StrictMode, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'

/** Renders a page into #root with the site's fonts and global styles. */
export function mountPage(page: ReactNode) {
  createRoot(document.getElementById('root')!).render(<StrictMode>{page}</StrictMode>)
}
