const express = require('express')
const router = express.Router()

const { validateToken } = require('../middleware')
const { CartController } = require('../controllers')

router.get('/', validateToken, CartController.getCartItems)
router.post('/', validateToken, CartController.createdOrAddCartItem)
router.delete('/', validateToken, CartController.deletedCartItem)
router.patch('/count', validateToken, CartController.increaseAndDecreaseProductQuantity)
router.patch('/', validateToken, CartController.changedToPurchaseOrderStatus)

module.exports = router