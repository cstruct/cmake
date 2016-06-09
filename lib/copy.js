
const os = require('os')
const co = require('co')
const fs = require('mz/fs')
const pify = require('pify')
const ncp = require('ncp').ncp

const copyDarwin = co.wrap(function * (files, targetBinary, targetShareFolder) {
  yield Promise.all([
    pify(ncp)(files.share, targetShareFolder, { clobber: true, stopOnErr: true }),
    pify(ncp)(files.binary, targetBinary, { clobber: true, stopOnErr: true })
  ])
})

module.exports = co.wrap(function * (files, targetBinary, targetShareFolder) {
  switch (os.platform()) {
    case 'linux':
      throw new Error('Not implemented')
    case 'darwin':
      yield copyDarwin(files, targetBinary, targetShareFolder)
      break
    default:
      throw new Error('Unsupported platform: ' + os.platform())
  }

  yield fs.chmod(targetBinary, 755)
})
