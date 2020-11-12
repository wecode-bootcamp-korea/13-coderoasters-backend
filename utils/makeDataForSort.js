const SORT_OPTION = {
  price: { price: 'desc' },
  '-price': { price: 'asc' },
  new: { created_at: 'desc' },
  popularity: { sales_amount: 'desc' },
}

const makeDataForSort = (obj) => {
  try {
    return { orderBy: [SORT_OPTION[obj.order_by], { id: 'asc' }] }
  } catch (error) {
    next(error)
  }
}

module.exports = makeDataForSort
