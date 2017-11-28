'use strict'

// Dependencies
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const morgan = require('morgan')
const Purdy = require('purdy')
const passport = require('../auth/passport')
const cors = require('cors')

// helpers
const Config = require('../config').config

// App Setup
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session(Config.session))
app.use(morgan(Config.morgan))
app.use(passport.initialize())
app.use((req, res, next) => {
  req.jsonResponse = (req.headers.accept === 'application/json')
  next()
})

const AuthRoutes = require('./auth')

// Handlers
app.options('/auth', cors())
app.use('/auth', cors(), AuthRoutes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  if (Config.env !== Config.production) {
    Purdy(err)
    console.error(err.stack.split('\n').filter(line => line.indexOf('node_modules') === -1).join('\n'))
  }
  res.json({ statusCode: err.status || 500, message: err.message })
})

// start the server
app.listen(Config.port, () => {
  console.log(`Server is running on :${Config.port}`)
  Purdy(Config)
})
