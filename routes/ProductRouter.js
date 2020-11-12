const express = require('express')
const router = express.Router()

const { ProductController } = require('../controllers')

router.get('/coffees', ProductController.getCoffeeList)
router.get('/equipments', ProductController.getEquipmentList)
router.get('/grounds', ProductController.getGroundList)
router.get('/options', ProductController.getOptionList)
router.get('/cluster', ProductController.updateClusterId)
router.post('/recommend', ProductController.recommendCoffee)
router.get('/similar/:productId', ProductController.getSimilarCoffeeList)
router.get('/:productId', ProductController.getProductDetail)

module.exports = router
