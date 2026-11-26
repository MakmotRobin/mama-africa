import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// jsdom does not implement layout APIs; the app scrolls sections into view on click.
Element.prototype.scrollIntoView = vi.fn()
