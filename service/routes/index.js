const Express = require('express')
const users = require('./users')

const router = new Express.Router()

router.use('/users', users)

module.exports = router
