'use strict'

require('dotenv').config({ path: './.env' })
const eventSave = require('./src/handlers/eventSave')

module.exports.create = (event, context, callback) =>
  eventSave(event, context, callback)
