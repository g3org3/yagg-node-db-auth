'use strict'

const express = require('express')
const router = express.Router()
const Config = require('../config').config
const jwt = require('jsonwebtoken')
const checkScopes = require('../helpers/checkScopes')
const passport = require('../auth/passport')

router.get('/', (req, res) => {
  res.json({ message: 'hello' })
})

router.get('/me', checkScopes, (req, res) => {
  const user = req.decoded
  delete user._doc.password;
  res.json({
    user: user._doc
  })
})

router.get('/logout', (req, res) => {
  res.cookie('_id', '', { maxAge: 0 })
  res.json({
    statusCode: 200,
    message: 'logout'
  })
})

router.post('/token', (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    console.log(err, user, info)
    if (err || !user) {
      res.status(401)
      return res.json({ statusCode: 401, message: info })
    }

    let expire = new Date()
    expire = expire.getTime() + (60 * 60 * 1000)
    user.expire = expire
    var token = jwt.sign(user, Config.jwtSecret, {})
    if (!req.jsonResponse) {
      res.cookie('_id', token, { httpOnly: true, session: true })
    }
    return res.json({
      statusCode: 200,
      success: true,
      message: 'Enjoy your token!',
      token: token
    })
  })(req, res, next)
})

module.exports = router
