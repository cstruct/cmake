#!/usr/bin/env node

var path = require('path')
var childProcess = require('child_process')

var child = childProcess.spawn(path.join(__dirname, 'cmake'), process.argv.slice(2), { stdio: 'inherit' })
child.on('close', function (code) {
  process.exit(code)
})
