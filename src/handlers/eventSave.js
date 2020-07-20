const Event = require('../domain/Event')

const eventSave = async (event, context, callback, dbConnection) => {
  const json = JSON.parse(event.body)

  const userEvent = new Event(json)

  userEvent.validate()
  if (userEvent.errors.length) {
    const errors = userEvent.getErrors()

    const response = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      statusCode: 500,
      body: JSON.stringify(errors),
    }

    return callback(response, null)
  }

  context.callbackWaitsForEmptyEventLoop = false
  const response = await userEvent.save(dbConnection)

  callback(null, response)
}

module.exports = eventSave
