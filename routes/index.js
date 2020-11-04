const express = require('express')
const router = express.Router()

const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')
const CartRouter = require('./CartRouter')

router.use('/users', UserRouter)
router.use('/products', ProductRouter)
router.use('/cart', CartRouter)

module.exports = router
