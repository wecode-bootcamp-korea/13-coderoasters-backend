const express = require('express')
const router = express.Router()

const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')
const CartRouter = require('./CartRouter')
const OrderRouter = require('./OrderRouter')

router.use('/users', UserRouter)
router.use('/products', ProductRouter)
router.use('/cart', CartRouter)
router.use('/order', OrderRouter)

module.exports = router
