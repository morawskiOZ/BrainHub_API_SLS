const emailFormat = 'Wrong email format'
const dateFormat = 'Wrong date format'

const errorFieldsLabels = [
  { name: 'email', label: 'Email' },
  { name: 'firstName', label: 'First name' },
  { name: 'lastName', label: 'Last name' },
  { name: 'date', label: 'Date' },
]

const getLabelForField = name =>
  errorFieldsLabels.find(input => input.name === name).label

const getFieldRequiredMessage = fieldName =>
  `Field ${getLabelForField(fieldName)} is required`

module.exports = {
  emailFormat,
  dateFormat,
  getFieldRequiredMessage,
}
