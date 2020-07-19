// const connectToDatabase = require('../../db')
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

  getErrors() {
    return this.errors
  }

  async save(connectToDatabase) {
    return await connectToDatabase().then(async () => {
      try {
        const response = await EventModel.create(this.data)
        return {
          statusCode: 200,
          body: JSON.stringify(response),
        }
      } catch (err) {
        return {
          statusCode: 200,
          body: JSON.stringify(err),
        }
      }
    })
  }
}

module.exports = Event
