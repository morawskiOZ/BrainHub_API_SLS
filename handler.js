'use strict'

require('dotenv').config({ path: './.env' })
const connectToDatabase = require('./db')
const Event = require('./src/models/event.js')

const eventCreateErrorHandler = require('./src/errors/eventCreate/errorHandler')

module.exports.create = (event, context, callback) => {
  const json = JSON.parse(event.body)

  const errors = eventCreateErrorHandler.checkErrors(json)
  if (errors.length) {
    const errorObject = eventCreateErrorHandler.getErrorResponse(
      errors,
      context.awsRequestId,
    )
    callback(JSON.stringify(errorObject))
  }

  context.callbackWaitsForEmptyEventLoop = false
  connectToDatabase().then(() => {
    Event.create(json)
      .then(response =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(response),
        }),
      )
      .catch(err =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify(err),
        }),
      )
  })
}
