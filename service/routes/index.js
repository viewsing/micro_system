const Express = require('express')
const auth = require('../middlewares/auth')
const upload = require('../middlewares/upload')
const users = require('./users')
const suppliers = require('./suppliers')
const products = require('./products')

const router = new Express.Router()

//next 之后的代码还会执行
router.use('/upload', upload)
router.use('/users', users)
router.use('/suppliers', auth.isLogin, suppliers)
router.use('/products', products)


module.exports = router
