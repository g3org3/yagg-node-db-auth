'use strict'

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/').User

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username: username }).then(user => {
    if (!user) return done(null, false, { message: 'Incorrect username.' })
    if (user.password !== password) return done(null, false, { message: 'Incorrect password.' })
    delete user.password
    return done(null, user)
  }).catch(err => {
    return done(err)
  })
}))

passport.serializeUser((user, done) => {
  delete user.password
  done(null, user)
})

passport.deserializeUser((id, done) => {
  console.log(id)
  User.find({ id }, (err, user) => done(err, user))
})

module.exports = passport
