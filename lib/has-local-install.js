const co = require('co')
const fs = require('mz/fs')
const Mode = require('stat-mode')

module.exports = co.wrap(function * (targetBinary) {
  try {
    const stat = fs.stat(targetBinary)
    const mode = new Mode(stat)

    return mode.owner.execute && mode.group.execute && mode.others.execute
  } catch (err) {
    if (err.code !== 'ENOENT') throw err

    return false
  }
})
