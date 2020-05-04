const { verify } = require('../utils')
const { NODE_ENV, APP_TOKEN } = process.env

const isVerified = (req, res, next) => {
  const bearerToken = req.headers.authorization.replace(/^Bearer /, '')
  const verifiedToken = verify(bearerToken)

  if (verifiedToken === APP_TOKEN || NODE_ENV === 'development') {
    next()
  } else {
    return res.sendStatus(401)
  }
}

module.exports = {
  isVerified
}
