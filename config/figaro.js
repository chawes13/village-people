// Configuration file for env vars.
// This information is picked up by env.js.

// These keys will break compilation if not defined.
const REQUIRED_KEYS = [
  // e.g. 'API_URL'
]

// These keys will be excluded from 
// the proccess.env object in the compiled JS.
const PRIVATE_KEYS = [
  'PROXIED_API_URL',
  'PROXIED_API_TOKEN',
]

module.exports = { REQUIRED_KEYS, PRIVATE_KEYS }