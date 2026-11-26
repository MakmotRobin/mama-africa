import { describe, expect, it } from 'vitest'
import { LEGAL_ENTITY } from './restaurant'

// Guards the deploy: the privacy policy and terms must not go live without a named controller.
describe('legal entity details for the privacy policy and terms', () => {
  it('has the legal name of the business or owner', () => {
    expect(LEGAL_ENTITY.name.trim()).not.toBe('')
  })

  it('has either no Partita IVA yet or a valid one (11 digits)', () => {
    expect(LEGAL_ENTITY.vatNumber).toMatch(/^(\d{11})?$/)
  })

  // Italian business websites must show the Partita IVA (DPR 633/72, art. 35); waiting for the owner.
  it.todo('has the Partita IVA from the owner')

  it('has the registered address', () => {
    expect(LEGAL_ENTITY.address.trim()).not.toBe('')
  })
})
