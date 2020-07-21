const Event = require('../domain/Event')

const eventSave = async (event, context, callback, dbConnection) => {
  const json = JSON.parse(event.body)

  const userEvent = new Event(json)

  userEvent.validate()
  if (userEvent.errors.length) {
    const errors = { errors: userEvent.getErrors() }

    const errorResponse = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      statusCode: 422,
      body: JSON.stringify(errors),
    }

    return callback(null, errorResponse)
  } else {
    context.callbackWaitsForEmptyEventLoop = false
    const response = await userEvent.save(dbConnection)

    return callback(null, response)
  }
}

module.exports = eventSave
