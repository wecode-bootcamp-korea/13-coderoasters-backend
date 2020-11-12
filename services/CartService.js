const prisma = require('../prisma')

const findCartItems = (userId) => {
  return prisma.orders.findMany({
    where: {
      user_id: userId,
      deleted_at: null,
      order_statuses: { name: 'order' },
    },
    include: {
      order_products: {
        include: {
          products: {
            include: {
              coffees: true,
              equipments: true
            }
          },
          grounds: true,
        },
      },
    }
  })
}

const convertCartItems = (order) => {
  const [{ order_products }] = order

  return order_products.map(({ products, grounds, quantity }) => ({
      'id': products.id,
      'name': products.name,
      'price':products.price,
      'imageUrl':products.image_url,
      'quantity':quantity,
      'bagWeight':products.coffees.bag_weight,
      'ground':{
        'id':grounds.id,
        'name':grounds.name
      }
  }))
}

const createProductCart = (fields) => {
  const { userId, productId, quantity, groundId } = fields
  return prisma.orders.create({
    data: {
      users: {
        connect: { id: userId }
      },
      order_statuses: {
        connect: { id: 1 }
      },
      order_products: {
        create: {
          quantity: quantity,
          grounds: { connect: { id: groundId } },
          products: { connect: { id: productId } }
        },
      }
    }
  })
}

const addProductCart = async (fields) => {
  const { orderId, productId, quantity, groundId } = fields
  
  const [ orderProduct ] = await prisma.order_products.findMany({
    where: {
      product_id: productId,
      order_id: orderId,
      ground_id: groundId
    }
  })

  if (!orderProduct) return prisma.order_products.create({
    data: {
      quantity: quantity,
      products: { connect: { id: productId } },
      orders: { connect: { id: orderId } },
      grounds: { connect: { id: groundId } },
    }
  })

  return prisma.order_products.update({
    where: {
      id: orderProduct.id
    },
    data: {
      quantity: { increment: quantity }
    }
  })
}

const deleteProductCart = async (fields) => {
  const { orderId, productId, groundId } = fields

  const [ orderProduct ] = await prisma.order_products.findMany({
    where: {
      product_id: Number(productId),
      order_id: orderId,
      ground_id: Number(groundId)
    }
  })

  if (!orderProduct) return orderProduct

  return prisma.order_products.delete({
    where: {
      id: orderProduct.id
    }
  })
}

const productQuantityHandler = (fields) => {
  const { orderId, productId, groundId, action } = fields
  
  return prisma.order_products.updateMany({
    where: {
      product_id: productId,
      order_id: orderId,
      ground_id: groundId
    },
    data: {
      quantity: { [action]: 1 }
    }
  })
}
 
module.exports = {
  findCartItems,
  convertCartItems,
  createProductCart,
  addProductCart,
  deleteProductCart,
  productQuantityHandler,
}