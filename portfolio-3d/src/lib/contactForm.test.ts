import { describe, expect, it } from 'vitest'

import { isSubmittable, isWellFormedAddress } from './contactForm'

/**
 * Local parts outside ASCII, kept as their own list because they are the case
 * a hand-rolled rule gets wrong quietly: `[a-z]` shaped character classes
 * refuse them, the refusal looks like a typo to the person typing, and nothing
 * in the page ever says otherwise.
 */
const unicodeLocalParts = ['josé@example.com', 'адиб@example.com', '张伟@example.com']

/** Shapes a deliverable address actually arrives in. */
const wellFormed = [
  'adibahsanchowdhury@gmail.com',
  'a@b.co',
  'first.last@sub.example.co.uk',
  'plus+tag@example.org',
  "o'brien@example.com",
  'UPPER@Example.COM',
  ...unicodeLocalParts,
]

/** Shapes nothing could be delivered to, and why each one is beyond reach. */
const malformed = [
  '', // nothing typed at all
  'adibahsanchowdhury', // no @: a name, not an address
  'adibahsanchowdhury.gmail.com', // the @ mistyped as a dot
  '@example.com', // a host with nobody at it
  'adib@', // an addressee with no host
  'adib@example', // a host with no TLD, so nothing resolves it
  'adib@example.c', // no TLD is one character long
  'adib@.com', // no host before the dot
  'adib@example.', // nothing after the dot
  'adib@@example.com', // two @, so no single split
  'adib ahsan@example.com', // whitespace inside the local part
  'adib@exa mple.com', // whitespace inside the host
]

describe('isWellFormedAddress', () => {
  it('accepts every shape a deliverable address arrives in', () => {
    for (const address of wellFormed) {
      expect(isWellFormedAddress(address), address).toBe(true)
    }
  })

  it('refuses an address nothing could be delivered to', () => {
    for (const address of malformed) {
      expect(isWellFormedAddress(address), address).toBe(false)
    }
  })

  it('does not mistake a non-ASCII local part for a malformed one', () => {
    for (const address of unicodeLocalParts) {
      expect(isWellFormedAddress(address), address).toBe(true)
    }
  })

  it('reads through the whitespace a pasted address carries', () => {
    // An address copied out of a mail client arrives with a space or a newline
    // attached about as often as it arrives clean. Surrounding whitespace is
    // not a mistake worth refusing over, so it changes no verdict either way.
    for (const address of wellFormed) {
      expect(isWellFormedAddress(`  ${address}\n`), address).toBe(true)
    }

    for (const address of malformed) {
      expect(isWellFormedAddress(`\t${address} `), address).toBe(false)
    }
  })
})

/** Something to reply to, so the message half is out of the way. */
const message = 'Hello — we are hiring for applied AI work.'

describe('isSubmittable', () => {
  it('accepts a draft with somewhere to reply and something to say', () => {
    expect(isSubmittable({ email: 'adibahsanchowdhury@gmail.com', message })).toBe(true)
  })

  it('refuses a message that is nothing but whitespace', () => {
    // A form that posts a blank body sends an empty inbox notification and the
    // sender no way of knowing it went nowhere useful.
    for (const blank of ['', ' ', '\t\t', '\n \n', '     ']) {
      expect(isSubmittable({ email: 'adib@example.com', message: blank }), JSON.stringify(blank)).toBe(
        false,
      )
    }
  })

  it('keeps a message that merely has whitespace around it', () => {
    expect(isSubmittable({ email: 'adib@example.com', message: `\n  ${message}  ` })).toBe(true)
  })

  it('requires both halves rather than either one', () => {
    const emails = { good: 'adib@example.com', bad: 'adib@example' }
    const messages = { good: message, bad: '   ' }

    for (const email of Object.values(emails)) {
      for (const body of Object.values(messages)) {
        const both = email === emails.good && body === messages.good

        expect(isSubmittable({ email, message: body }), `${email} / ${JSON.stringify(body)}`).toBe(
          both,
        )
      }
    }
  })

  it('judges the address exactly as the address rule does', () => {
    // The two are one rule seen from two places — the button reads this one and
    // the address field reads the other — so they must not be able to disagree.
    for (const email of [...wellFormed, ...malformed]) {
      expect(isSubmittable({ email, message }), email).toBe(isWellFormedAddress(email))
    }
  })
})
