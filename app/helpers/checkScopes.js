'use strict'

// Deps
const jwt = require('jsonwebtoken')
const Config = require('../config').config

module.exports = function checkScopes (req, res, next) {
  // check header or url parameters or post parameters for token
  var body = req.body || {}
  var query = req.query || {}
  var cookies = req.cookies || {}
  var token = body.token || query.token || req.headers['x-access-token'] || cookies._id

  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, Config.jwtSecret, function (err, decoded) {
      if (err) {
        return res.status(401).send({ success: false, message: 'Failed to authenticate token.' })
      } else {
        // if everything is good, save to request for use in other routes
        const today = new Date()
        const left = (decoded.expire - today.getTime()) / 1000
        if (left <= 0) return res.status(401).send({ success: false, message: 'Failed to authenticate token.' })
        decoded.expire = left
        req.decoded = decoded
        next()
      }
    })
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    })
  }
}
