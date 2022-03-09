import * as fs from 'fs'
import log from 'loglevel'

let currentDate = new Date()
const createStream = (date: Date) => {
  return fs.createWriteStream(
    `${__dirname}/../logs/${date.toLocaleDateString('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })}.log`,
    {
      flags: 'a',
      mode: 0o755,
    }
  )
}
let stream = createStream(currentDate)

log.setLevel('debug')
const logger = (message: string, level: 'info' | 'warn' | 'error' | 'debug' = 'info') => {
  log[level](message)
  const newDate = new Date()
  if (newDate.getDate() !== currentDate.getDate()) {
    // new day with a new log file
    stream = createStream(newDate)
    currentDate = newDate
  }
  stream.write(`${new Date().toLocaleTimeString()}[${level.toUpperCase()}]: ${message}\n`)
}

export default logger
