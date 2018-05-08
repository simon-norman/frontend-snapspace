'use strict'

const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  SNAPSPACE_API: '"https://test-api-snapspace.herokuapp.com"'
})
