const validateEmail = require('./email')

describe('validateEmail function', () => {
  it('should return false for wrong input', () => {
    expect(validateEmail('')).toBe(false)
    expect(validateEmail(null)).toBe(false)
    expect(validateEmail(undefined)).toBe(false)
    expect(validateEmail([])).toBe(false)
    expect(validateEmail({})).toBe(false)
    expect(validateEmail(0)).toBe(false)
  })
  it('should return false for incorrect emails', () => {
    expect(validateEmail('w')).toBe(false)
    expect(validateEmail('e@')).toBe(false)
    expect(validateEmail('2@w.')).toBe(false)
    expect(validateEmail('@wp.pl')).toBe(false)
    expect(validateEmail('.pl')).toBe(false)
  })
  it('should return true for correct emails', () => {
    expect(validateEmail('w@w.pl')).toBe(true)
    expect(validateEmail('e@wwwww.pl')).toBe(true)
    expect(
      validateEmail('wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww2@wwww.wpl'),
    ).toBe(true)
    expect(validateEmail('21212!&@wp.pln')).toBe(true)
    expect(validateEmail('1231@w.l')).toBe(true)
    expect(validateEmail('tavato1585@adramail.com')).toBe(true)
  })
})
