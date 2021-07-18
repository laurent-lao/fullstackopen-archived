const logger = require('./logger')

const errorHandler = (error, request, response, next) => {
  logger.info(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
  return null // lint happy
}

module.exports = {
  errorHandler,
}
