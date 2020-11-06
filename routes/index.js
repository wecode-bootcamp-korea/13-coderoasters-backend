const express = require('express')
const router = express.Router()

const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')

router.use('/users', UserRouter)
router.use('/products', ProductRouter)

module.exports = router
