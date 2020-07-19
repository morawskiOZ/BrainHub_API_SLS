const Event = require('../domain/Event')

const eventSave = (event, context, callback) => {
  const json = JSON.parse(event.body)

  const userEvent = new Event(json)
  userEvent.validate()
  if (userEvent.errors.length) {
    event.sendBackErrors(callback)
  }
  context.callbackWaitsForEmptyEventLoop = false
  userEvent.save(callback)
}

module.exports = eventSave
