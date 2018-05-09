'use strict'

const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"test"',
  SNAPSPACE_API: JSON.stringify(process.env.SNAPSPACE_API)
})
