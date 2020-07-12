const mongoose = require('mongoose')
const EventSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, required: true },
})
module.exports = mongoose.model('Event', EventSchema)
