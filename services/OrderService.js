const prisma = require('../prisma')

const findOrderItems = (userId) => {
  return prisma.orders.findMany({
    where: {
      user_id: userId,
      deleted_at: null,
      order_statuses: { name: 'payed' },
    },
    include: {
      order_products: {
        include: {
          products: {
            include: {
              coffees: {
                include: { roasters: true }
              },
              equipments: true
            }
          },
          grounds: true,
        },
      },
    }
  })
}

const convertOrderItems = (orders) => {
  return orders.map((order) => ({
    'id': order.id,
    'orderDate': order.updated_at,
    'orderItems': order.order_products.map(({ products, grounds, quantity }) => ({
      'id': products.id,
      'name': products.name,
      'price': products.price,
      'imageUrl': products.image_url,
      'quantity': quantity,
      'bagWeight': products.coffees.bag_weight,
      'roasters':products.coffees.roasters.name,
      'ground': {
        'id': grounds.id,
        'name': grounds.name
      }
    }))
  }))

}

module.exports = {
  findOrderItems,
  convertOrderItems,
}