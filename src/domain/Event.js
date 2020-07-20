// const connectToDatabase = require('../../db')
const emailValidator = require('../validators/email')
const dateValidator = require('../validators/date')

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

    if (!this.errors.some(error => error && error.date)) {
      const isDateCorrect = dateValidator(this.data.date)
      if (!isDateCorrect) {
        this.errors.push({ date: errorMessages.dateFormat })
      }
    }
  }

  getErrors() {
    return this.errors
  }

  async save(connectToDatabase) {
    await connectToDatabase()
    try {
      const response = await EventModel.create(this.data)
      return {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        statusCode: 200,
        body: JSON.stringify(response),
      }
    } catch (err) {
      return {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        statusCode: 500,
        body: JSON.stringify(err),
      }
    }
  }
}

module.exports = Event
