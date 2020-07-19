const eventSave = require('./eventSave')
const dbHandler = require('../mocks/db-handler')

describe('Event Save handler', () => {
  afterAll(async () => await dbHandler.closeDatabase())
  test('should call callback with correct data after successful contention to database', async () => {
    const data = {
      email: 'test@wp.pl',
      firstName: 'Test',
      lastName: 'Testawski',
      date: '1987-09-28',
    }

    let lambdaCallbackArgs
    const mockedLambdaCallback = (error, success) => {
      lambdaCallbackArgs = { error, success }
    }

    await eventSave(
      { body: JSON.stringify(data) },
      { callbackWaitsForEmptyEventLoop: true },
      mockedLambdaCallback,
      dbHandler.connect,
    ).then(() => {
      const parsedData = JSON.parse(lambdaCallbackArgs.success.body)
      expect(lambdaCallbackArgs.error).toBe(null)
      expect(lambdaCallbackArgs.success.statusCode).toBe(200)
      expect(parsedData.email).toBe(data.email)
      expect(parsedData.firstName).toBe(data.firstName)
      expect(parsedData.lastName).toBe(data.lastName)
      // Cut off time stamp from the date wchich is automatically added by mongoose
      expect(parsedData.date.substring(0, 10)).toBe(data.date)
    })
  })
  test('should call callback with error data if the inputs are incorrect', async () => {
    const data = {
      email: 'testwww',
      firstName: 'Test',
      lastName: 'Testawski',
      date: '1981117-09-28',
    }

    let lambdaCallbackArgs
    const mockedLambdaCallback = (error, success) => {
      lambdaCallbackArgs = { error, success }
    }

    await eventSave(
      { body: JSON.stringify(data) },
      { callbackWaitsForEmptyEventLoop: true },
      mockedLambdaCallback,
      dbHandler.connect,
    ).then(() => {
      expect(lambdaCallbackArgs.success).toBe(null)
      expect(lambdaCallbackArgs.error).toStrictEqual([
        { email: 'Wrong email format' },
        { date: 'Wrong date format' },
      ])
    })
  })
})
