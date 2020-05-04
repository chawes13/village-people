const jwt = require('jsonwebtoken')

const {
  SESSION_SECRET
} = process.env

function sign (payload) {
  return jwt.sign(payload, SESSION_SECRET)
}

function decode (token) {
  return jwt.decode(token, SESSION_SECRET)
}

function verify (token) {
  return jwt.verify(token, SESSION_SECRET)
}

module.exports = {
  sign,
  decode,
  verify,
}
