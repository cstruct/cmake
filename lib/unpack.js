const os = require('os')
const co = require('co')
const path = require('path')
const decompress = require('decompress')
const fsTemp = require('fs-temp/promise')
const debug = require('debug')('cmake:unpack')

const unpackDarwin = co.wrap(function * (archive, dir) {
  const base = path.join(dir, 'cmake-3.5.2-Darwin-x86_64/CMake.app/Contents/')
  const files = yield decompress(archive, dir)

  debug(`Unpacked to: ${dir}`)

  const binaries = files.filter(file => path.relative(path.join(dir, file.path), path.join(base, 'bin/cmake')) === '')
  const shares = files.filter(file => path.relative(path.join(dir, file.path), path.join(base, 'share/')) === '')

  if (binaries.length === 0) throw new Error('No cmake binary found in archive')
  if (shares.length === 0) throw new Error('No share folder found in archive')

  return {
    binary: binaries[0].path,
    share: shares[0].path
  }
})

module.exports = co.wrap(function * (archive) {
  const dir = yield fsTemp.mkdir()
  let unpackedFiles
  switch (os.platform()) {
    case 'linux':
      throw new Error('Not implemented')
    case 'darwin':
      unpackedFiles = yield unpackDarwin(archive, dir)
      break
    default:
      throw new Error('Unsupported platform: ' + os.platform())
  }
  return unpackedFiles
})
