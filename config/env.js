const Figaro = require('figaro-js')
const { omit, mapValues } = require('lodash')
const { REQUIRED_KEYS, PRIVATE_KEYS } = require('./figaro')

// Converts strings to primitive values if possible
// Eg '5' -> 5, 'true' -> true, 'string' -> 'string'

function coerce(str) {
  try {
    return JSON.parse(str)
  } catch (e) {
    return str
  }
}

// Loads figaro values into process.env
function loadEnv() {
  Figaro.load()
  Figaro.requireKeys(...REQUIRED_KEYS)
}

// Returns public env for injection into code
function loadPublicEnv() {
  loadEnv()
  // Omit private keys
  const whitelistedEnv = omit(process.env, ...PRIVATE_KEYS)
  // Convert values into primitives
  return mapValues(whitelistedEnv, coerce)
}

module.exports = { loadEnv, loadPublicEnv }