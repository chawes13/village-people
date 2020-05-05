// Configuration file for env vars.
// This information is picked up by env.js.

// These keys will break compilation if not defined.
const REQUIRED_KEYS = [
  'API_URL',
]

// These keys will be excluded from
// the process.env object in the compiled JS.
const PRIVATE_KEYS = [
  'PROXIED_API_URL',
  'PROXIED_API_TOKEN',
  'GCLOUD_PROJECT',
  'GCLOUD_PRIVATE_KEY',
  'GCLOUD_CLIENT_EMAIL',
  'SPREADSHEET_ID',
  'SHEET_NAME',
  'FILTER_SHEET_NAME',
  'SESSION_SECRET',
  'CLAIM_ACCOUNT_TOKEN',
  'APP_TOKEN',
]

module.exports = { REQUIRED_KEYS, PRIVATE_KEYS }
