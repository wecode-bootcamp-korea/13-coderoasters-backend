const { ProductService } = require('../services')
const errorGenerator = require('../utils/errorGenerator')

const getProductDetail = async (req, res, next) => {
  try {
    const { productId } = req.params
    const foundProduct = await ProductService.findProduct(productId)

    if (!foundProduct)
      errorGenerator({ statusCode: 404, message: 'product not found' })

    res.status(200).json({ message: 'product found', foundProduct })
  } catch (err) {
    next(err)
  }
}

const getCoffeeList = async (req, res, next) => {
  try {
    const { query } = req
    const filteredCoffeeList = await ProductService.filterCoffees(query)

    res.status(200).json({ message: 'coffee list found', filteredCoffeeList })
  } catch (err) {
    next(err)
  }
}

const getEquipmentList = async (req, res, next) => {
  try {
    const foundEquipmentList = await ProductService.findEquipments()

    res
      .status(200)
      .json({ message: 'equipment list found', foundEquipmentList })
  } catch (eer) {
    next(err)
  }
}

const getGroundList = async (req, res, next) => {
  try {
    const foundGroundList = await ProductService.findGrounds()

    res.status(200).json({ message: 'ground list found', foundGroundList })
  } catch (err) {
    next(err)
  }
}

const getOptionList = async (req, res, next) => {
  try {
    const foundOptions = await ProductService.findOptions()

    res.status(200).json({ message: 'filter list found', foundOptions })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getProductDetail,
  getCoffeeList,
  getEquipmentList,
  getGroundList,
  getOptionList,
}
