const connectToDatabase = require('../../db')
const emailValidator = require('../validators/email')
const errorMessages = require('../errors/messages')
const EventModel = require('../models/event')

class Event {
  constructor(data) {
    this.data = data
    this.errors = []
    this.requiredFields = ['email', 'firstName', 'lastName', 'date']
  }

  validate() {
    console.log(this)
    console.log(this.requiredFields)
    this.requiredFields.forEach(field => {
      if (!this.data[field]) {
        this.errors.push({
          [field]: errorMessages.getFieldRequiredMessage(field),
        })
      }
    })

    if (!this.errors.some(error => error && error.email)) {
      const isEmailCorrect = emailValidator(this.data.email)
      if (!isEmailCorrect) {
        this.errors.push({ email: errorMessages.emailFormat })
      }
    }
  }

  sendBackErrors(callback) {
    const body = this.errors
    callback(
      JSON.stringify({
        errorType: 'Unable to process request',
        httpStatus: 422,
        body,
      }),
    )
  }

  save(callback) {
    connectToDatabase().then(() => {
      EventModel.create(this.data)
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
}

module.exports = Event
