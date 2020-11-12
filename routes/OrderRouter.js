const express = require('express')
const router = express.Router()

const { validateToken } = require('../middleware')
const { OrderController } = require('../controllers')

router.get('/', validateToken, OrderController.getOrderHistory)

module.exports = router