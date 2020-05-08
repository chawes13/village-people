const { verify } = require('../utils')
const { NODE_ENV, APP_TOKEN } = process.env

const replace = (str, pattern, replacement) => {
  if (!str) return ''
  return str.replace(pattern, replacement)
}

const isVerified = (req, res, next) => {
  const bearerToken = replace(req.headers.authorization, /^Bearer /, '')
  let verifiedToken = null

  try {
    verifiedToken = verify(bearerToken)
  } catch (e) {
    // do nothing
  }

  if (verifiedToken === APP_TOKEN || NODE_ENV === 'development') {
    next()
  } else {
    return res.status(401).json({})
  }
}

module.exports = {
  isVerified
}
