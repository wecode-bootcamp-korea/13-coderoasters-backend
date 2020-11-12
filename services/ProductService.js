const prisma = require('../prisma')
const makeDataForFilter = require('../utils/makeDataForFilter')
const makeDataForSort = require('../utils/makeDataForSort')
const { getClusterId } = require('../utils/assignCluster')
const OFFSET = 18

const filterCoffees = (query) => {
  return prisma.products.findMany({
    skip: query.page ? (Number(query.page) - 1) * OFFSET : 0,
    take: 18,
    ...makeDataForSort(query),
    select: {
      id: true,
      name: true,
      price: true,
      image_url: true,
      created_at: true,
      coffees: {
        select: {
          id: true,
          taste: true,
          roasters: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    where: { ...makeDataForFilter(query) },
  })
}

const findProduct = async (productId) => {
  const foundProduct = await prisma.products.findOne({
    where: { id: Number(productId) },
  })

  if (foundProduct.product_type === 'coffee') {
    const coffee = await prisma.coffees.findOne({
      where: { product_id: Number(productId) },
      include: {
        roasters: true,
      },
    })
    foundProduct.coffees = coffee
  }

  if (foundProduct.product_type === 'equipment') {
    const equipment = await prisma.equipments.findOne({
      where: { product_id: Number(productId) },
    })
    foundProduct.equipment = equipment
  }

  return foundProduct
}

const findEquipments = () => {
  return prisma.products.findMany({
    where: {
      product_type: 'equipment',
    },
    include: {
      equipments: true,
    },
  })
}

const findGrounds = () => {
  return prisma.grounds.findMany({})
}

const findOptions = () => {
  return prisma.filter_categories.findMany({
    include: { filter_options: true },
  })
}

const updateClusterId = async () => {
  const productArray = await prisma.products.findMany({
    where: { product_type: 'coffee' },
    include: { coffees: true },
  })

  const infoArray = productArray.map((product) => ({
    productId: product.id,
    clusterId: getClusterId(product),
  }))

  const prismaRequest = infoArray.map(({ productId, clusterId }) =>
    prisma.products.update({
      where: { id: productId },
      data: {
        coffees: {
          update: {
            cluster_id: clusterId,
          },
        },
      },
    })
  )

  await Promise.all(prismaRequest)
}

module.exports = {
  findProduct,
  filterCoffees,
  findEquipments,
  findGrounds,
  findOptions,
  updateClusterId,
}
