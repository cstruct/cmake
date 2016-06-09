const co = require('co')
const got = require('got')
const streamToPromise = require('stream-to-promise')
const fsTemp = require('fs-temp/promise')
const debug = require('debug')('cmake:download')

module.exports = co.wrap(function * (url) {
  const targetStream = fsTemp.createWriteStream()
  const downloadStream = got.stream(url)

  downloadStream.on('response', res => {
    const length = parseInt(res.headers['content-length'], 10)
    let current = 0
    let oldPercentage = 0

    downloadStream.on('data', (chunk) => {
      current += chunk.length
      const percentage = Math.floor(100.0 * current / length)
      if (percentage !== oldPercentage) {
        debug(`Downloading ${percentage}%`)
        oldPercentage = percentage
      }
    })
  })

  yield streamToPromise(downloadStream.pipe(targetStream))

  return targetStream.path
})
