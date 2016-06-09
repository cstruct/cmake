const os = require('os')

module.exports = function getUrl (version) {
  switch (os.platform()) {
    case 'linux':
      switch (os.arch()) {
        case 'ia32':
          return `https://cmake.org/files/v${version.replace(/\.[0-9]+$/, '')}/cmake-${version}-Linux-i386.tar.gz`
        case 'x64':
          return `https://cmake.org/files/v${version.replace(/\.[0-9]+$/, '')}/cmake-${version}-Linux-x86_64.tar.gz`
        default:
          throw new Error('Unsupported arch: ' + os.arch())
      }
    case 'darwin':
      switch (os.arch()) {
        case 'x64':
          return `https://cmake.org/files/v${version.replace(/\.[0-9]+$/, '')}/cmake-${version}-Darwin-x86_64.tar.gz`
        default:
          throw new Error('Unsupported arch: ' + os.arch())
      }
    default:
      throw new Error('Unsupported platform: ' + os.platform())
  }
}
