const { OrderService } = require('../services')
const { errorGenerator } = require('../utils')

const getOrderHistory = async (req, res, next) => {
  try {
    const { id: userId } = req.foundUser
    const orderItems = await OrderService.findOrderItems(userId)

    if (!orderItems.length) return res.status(400).json({ message: 'not found order', orderItems })

    const convertedOrderItems = await OrderService.convertOrderItems(orderItems)

    return res.status(200).json({ message: 'success', orders: convertedOrderItems })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getOrderHistory
}