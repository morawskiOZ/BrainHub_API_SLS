'use strict'

require('dotenv').config({ path: './.env' })
const connectToDatabase = require('./db')
const eventSave = require('./src/handlers/eventSave')

module.exports.create = async (event, context, callback) =>
  await eventSave(event, context, callback, connectToDatabase)
