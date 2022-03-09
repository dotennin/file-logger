import logger from './logger'

class LoggerError extends Error {
  public date: Date
  public constructor(...params: string[]) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, LoggerError)
    }

    this.name = 'ValidationError'
    this.date = new Date()

    // Custom log information
    logger(this.message, 'error')
  }
}

export default LoggerError
