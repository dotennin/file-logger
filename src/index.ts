import LoggerError from './LoggerError'
import logger from './logger'
import path from 'path'

const __basedir = path.resolve(__dirname + '/../')

export { logger as fileLogger, LoggerError, __basedir }
