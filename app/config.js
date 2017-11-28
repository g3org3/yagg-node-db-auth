'use strict'

// Deps
const Confidence = require('confidence')

// Main Config
const config = {
  projectName: 'auth-server',
  env: process.env.NODE_ENV || 'development',
  port: process.env.APP_PORT || 1338,
  production: 'production',
  logConf: true,
  db: {
    host: {
      $filter: 'env',
      $default: 'localhost',
      staging: 'db',
      production: 'db'
    },
    port: '27017',
    collection: 'mydb',
    adapter: 'demo'
  },
  init: process.env.NODE_APP_INIT || false,
  jwtSecret: 'blabla-secret',
  morgan: process.env.MORGAN || 'dev',
  session: {
    resave: false,
    secret: 'keyboard cat',
    saveUninitialized: true,
    cookie: {
      $filter: 'env',
      $default: { maxAge: 3600 },
      production: { maxAge: 60000, secure: true }
    }
  }
}

const store = new Confidence.Store(config)
module.exports = {
  config: store.get('/', { env: store.get('/env') }),
  get: (key, criteria) => store.get(key, criteria || {})
}
