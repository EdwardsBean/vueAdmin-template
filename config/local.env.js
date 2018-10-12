'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

//与本地服务端联调
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://localhost/cloud-api/public"',
})
