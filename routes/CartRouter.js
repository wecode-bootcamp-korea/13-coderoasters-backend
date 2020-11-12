const express = require('express')
const router = express.Router()

const { validateToken } = require('../middleware')
const { CartController } = require('../controllers')

router.get('/', validateToken, CartController.getCartItems)
router.post('/', validateToken, CartController.createOrAddCartItem, CartController.getCartItems)
router.delete('/', validateToken, CartController.deleteCartItem)
router.patch('/count', validateToken, CartController.increaseAndDecreaseProductQuantity)
router.patch('/', validateToken, CartController.changeToPurchaseOrderStatus)

module.exports = router