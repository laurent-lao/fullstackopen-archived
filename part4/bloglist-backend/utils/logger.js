/* eslint-disable no-console */
const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(...params)
  }
}

const debug = (...params) => {
  console.log(...params)
}

module.exports = {
  info,
  error,
  debug,
}
