const Express = require('express')
const auth = require('../middlewares/auth')
const users = require('./users')
const suppliers = require('./suppliers')
const products = require('./products')

const router = new Express.Router()

router.use('/users', users)
router.use('/suppliers', auth.isLogin, suppliers)
router.use('/products', products)

module.exports = router
