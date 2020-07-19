const Event = require('../domain/Event')

describe('domain Event class', () => {
  test('should construct Event with the data passed', () => {
    const data = {
      email: 'test@wp.pl',
      firstName: 'Test',
      lastName: 'Testawski',
      date: '1987-09-28',
    }
    const userEvent = new Event(data)
    expect(userEvent.data).toStrictEqual(data)
  })
  test('fresh event should not have any errors', () => {
    const data = {
      email: 'test@wp.pl',
      firstName: 'Test',
      lastName: 'Testawski',
      date: '1987-09-28',
    }
    const userEvent = new Event(data)
    expect(userEvent.getErrors()).toStrictEqual([])
  })
  test('event with correct data after validation should not have any errors', () => {
    const data = {
      email: 'test@wp.pl',
      firstName: 'Test',
      lastName: 'Testawski',
      date: '1987-09-28',
    }
    const userEvent = new Event(data)
    userEvent.validate()
    expect(userEvent.getErrors()).toStrictEqual([])
  })
  test('event with incorrect data after validation should have errors', () => {
    const data = {
      email: 'testwp.pl',
      lastName: 'Testawski',
      date: '1987ddd-09-28',
    }
    const userEvent = new Event(data)
    userEvent.validate()
    expect(userEvent.getErrors()).toStrictEqual([
      { firstName: 'Field First name is required' },
      { email: 'Wrong email format' },
      { date: 'Wrong date format' },
    ])
  })
})
