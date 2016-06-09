const co = require('co')
const path = require('path')
const debug = require('debug')('cmake')

const getDownloadUrl = require('./lib/get-download-url')
const download = require('./lib/download')
const hasLocalInstall = require('./lib/has-local-install')
const unpack = require('./lib/unpack')
const copy = require('./lib/copy')

const CMAKE_VERSION = '3.5.2'

co(function * () {
  const targetBinary = path.join(__dirname, 'bin', 'cmake')
  const targetShareFolder = path.join(__dirname, 'share')

  if (yield hasLocalInstall(targetBinary)) {
    debug('Local installation found')
    return
  }

  const url = getDownloadUrl(CMAKE_VERSION)
  debug('Remote url: ' + url)

  const archive = yield download(url)
  debug('Downloaded file: ' + archive)

  const unpackedFiles = yield unpack(archive)
  debug('Unpacked files: ' + unpackedFiles)

  yield copy(unpackedFiles, targetBinary, targetShareFolder)
}).catch(err => console.error(err.stack))
