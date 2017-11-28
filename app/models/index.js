'use strict'

const mongoose = require('mongoose')
const Config = require('../config').config
require('./user')
const connectionString = `mongodb://${Config.db.host}:${Config.db.port}/${Config.db.collection}`

if (Config.init) {
  const _ = {};
  mongoose.connect(connectionString, { useMongoClient: true })
  .then(db => {
    _.db = db
    return db.model('User').findOne({ username: 'admin' })
  })
  .then(user => {
    if (!user) {
      return _.db.model('User').create({
        username: 'admin',
        password: Config.init,
        scopes: { admin: true }
      })
    }
    return user
  })
  .then(user => {
    console.log(user._id)
  })
  .catch(err => {
    console.log(`Error: ${err.message}`)
  })
}

module.exports.User = {
  findOne: (query) => {
    return mongoose.connect(connectionString, { useMongoClient: true })
    .then(db => (
      db.model('User').findOne(query)
    ))
    .then(user => {
      return user
    })
    .catch(err => {
      console.log(`Error: ${err.message}`)
    })
  }
}
