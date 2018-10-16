const Express = require('express')
const auth = require('../middlewares/auth')
const users = require('./users')
const suppliers = require('./suppliers')

const router = new Express.Router()

router.use('/users', users)
router.use('/suppliers', auth.isLogin, suppliers)

module.exports = router
