'use strict'

// Deps
const mongoose = require('mongoose')
const Promise = require('bluebird')
const Schema = mongoose.Schema
mongoose.Promise = Promise

const UserSchema = {
  name: String,
  username: String,
  password: String,
  scopes: Object
}

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema(UserSchema))
