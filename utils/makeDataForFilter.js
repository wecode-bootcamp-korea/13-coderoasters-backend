const { castIfInt } = require('./typeCaster')

const PRICE_OPTION = {
  1: { lt: 15 },
  2: { gte: 15, lt: 18 },
  3: { gte: 18, lt: 22 },
  4: { gte: 22 },
}

const makeDataForFilter = (obj) => {
  try {
    const returnObj = { AND: [{ product_type: 'coffee' }] }
    const { order_by, page, ...modifiedObj } = obj

    for (const key in modifiedObj) {
      returnObj['AND'].push({ OR: makeOrArray(modifiedObj, key) })
    }

    return returnObj
  } catch (error) {
    console.error(error)
  }
}

const makeOrArray = (obj, key) => {
  try {
    if (key === 'price_bucket')
      return obj[key].map((bucketId) => ({ price: PRICE_OPTION[bucketId] }))

    if (key === 'roaster')
      return obj[key].map((filterOption) => ({
        coffees: {
          roasters: {
            name: filterOption,
          },
        },
      }))

    return obj[key].map((filterOption) => ({ coffees: { [key]: castIfInt(filterOption) } }))
  } catch (error) {
    console.error(error)
  }
}

module.exports = makeDataForFilter
