'use strict'

const User = {
  store: [{
    id: '0',
    password: 'admin',
    username: 'admin',
    name: 'Admin',
    scope: [
      'admin'
    ]
  }],
  find: (query, cb) => {
    const user = User.store[0]
    cb(null, Object.assign({}, user))
  },
  findOne: (query, cb) => {
    const user = User.store[0]
    cb(null, Object.assign({}, user))
  }
}

module.exports = User
