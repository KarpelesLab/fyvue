'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./fyvue.prod.cjs')
} else {
  module.exports = require('./fyvue.dev.cjs')
}