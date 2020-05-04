const router = require('express').Router()
const { isVerified } = require('./middleware')

router.use('/authentication', require('./authentication'))
router.use('/contacts', isVerified, require('./contacts'))

// 404 handler
router.use((req, res, next) => {
  const error = new Error('Endpoint Not Found')
  error.status = 404
  next(error)
})

module.exports = router
