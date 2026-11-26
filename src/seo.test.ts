import { describe, expect, it } from 'vitest'
import html from '../index.html?raw'
import { RESTAURANT_CONFIG } from './config/restaurant'

const SITE_URL = 'https://makmotrobin.github.io/mama-africa/'
const doc = new DOMParser().parseFromString(html, 'text/html')

function meta(selector: string): string | null {
  return doc.querySelector(selector)?.getAttribute('content') ?? null
}

describe('index.html search and sharing tags', () => {
  it('describes the restaurant as Nigerian in the title and description', () => {
    expect(doc.title).toMatch(/Nigeriana/)
    expect(meta('meta[name="description"]')).toMatch(/nigeriana/i)
  })

  it('has Open Graph tags with an absolute image URL for link previews', () => {
    expect(meta('meta[property="og:title"]')).toBeTruthy()
    expect(meta('meta[property="og:description"]')).toBeTruthy()
    expect(meta('meta[property="og:url"]')).toBe(SITE_URL)
    expect(meta('meta[property="og:image"]')).toMatch(new RegExp(`^${SITE_URL}images/.+\\.jpg$`))
  })

  it('uses the small logo as the browser-tab icon', () => {
    expect(doc.querySelector('link[rel="icon"]')?.getAttribute('href')).toBe('images/logo-128.jpg')
  })

  it('has Restaurant schema matching the restaurant config, without unconfirmed hours', () => {
    const script = doc.querySelector('script[type="application/ld+json"]')
    const schema = JSON.parse(script?.textContent ?? '{}')

    expect(schema['@type']).toBe('Restaurant')
    expect(schema.telephone).toBe(RESTAURANT_CONFIG.phoneDial)
    expect(schema.address.postalCode).toBe('87100')
    expect(schema.servesCuisine).toContain('Nigerian')
    expect(schema.openingHoursSpecification).toBeUndefined()
  })
})
