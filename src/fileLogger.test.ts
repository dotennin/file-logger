import fs from 'fs'
import { fileLogger } from './index'

const mockDateString = '2999-12-31'
jest.useFakeTimers('modern')
jest.setSystemTime(new Date(mockDateString).getTime())
jest.setTimeout(10000)

const expectedFilePath = `${__dirname}/../../logs/${mockDateString}.log`

const readLogFile = () => {
  return new Promise((resolve) => {
    fs.readFile(expectedFilePath, 'utf8', (err, data) => {
      if (err) throw err
      console.log('load data value: ', data)
      resolve(data)
    })
  })
}

describe('test fileLogger', () => {
  afterAll(() => {
    jest.useRealTimers()

    console.log('All tests passed, trying to remove the log file...')
    fs.unlink(expectedFilePath, () => {
      process.stdout.write(`${expectedFilePath} unlinked \n`)
    })
  })

  it('log file can be created propely', () => {
    fileLogger('hello foo')

    expect(fs.existsSync(expectedFilePath)).toBe(true)
  })
  it('log text can be added properly.', async () => {
    const line = await readLogFile()
    expect(line).toContain('hello foo')
  })

  it('log file need to be recreated when Date changed', () => {
    const newDateString = '3000-01-01'
    jest.setSystemTime(new Date(newDateString).getTime())
    fileLogger('new date string test.')

    const newFilePath = expectedFilePath.replace(mockDateString, newDateString)
    setTimeout(() => {
      expect(fs.existsSync(newFilePath)).toBe(true)
    }, 1000)

    jest.setSystemTime(new Date(mockDateString).getTime())
    fs.unlink(newFilePath, () => {
      process.stdout.write(`${newFilePath} unlinked \n`)
    })
  })
})
