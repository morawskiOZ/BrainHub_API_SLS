const requiredFields = ['email', 'firstName', 'lastName', 'date']

const emailValidator = require('../../validators/email')
const errorGenerator = require('../messages')

const checkErrors = data => {
  const errors = []

  requiredFields.forEach(field => {
    if (!data[field]) {
      errors.push({ [field]: errorGenerator.fieldRequired(field) })
    }
  })

  if (!errors.some(error => error && error.email)) {
    const isEmailCorrect = emailValidator(data.email)
    if (!isEmailCorrect) {
      errors.push({ email: errorGenerator.emailFormat })
    }
  }

  return errors
}

const getErrorResponse = (errors, requestId) => {
  return {
    errorType: 'Unable to process request',
    httpStatus: 422,
    requestId,
    body: { errors },
  }
}

module.exports = {
  checkErrors,
  getErrorResponse,
}
