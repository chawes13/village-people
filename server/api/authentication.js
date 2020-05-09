const router = require('express').Router()
const { atob, sign, decode } = require('../utils')
const { APP_TOKEN, CLAIM_ACCOUNT_TOKEN } = process.env
const { isVerified } = require('./middleware')

// Claim account
router.post('/accounts', (req, res) => {
  const decodedToken = atob(req.body.token)
  if (CLAIM_ACCOUNT_TOKEN && decodedToken === CLAIM_ACCOUNT_TOKEN) {
    const signedToken = sign(APP_TOKEN)
    res.json({ data: { signedToken }})
  } else {
    res.status(401).json({ data: { message: 'Invalid token' }})
  }
})

// Authenticate
router.post('/sessions', isVerified, (req, res) => {
  res.status(200).json({ data: { message: 'User validated successfully' }})
})

module.exports = router
