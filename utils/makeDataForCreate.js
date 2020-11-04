const makeDataForCreate = (fields) => {
  return Object.keys(fields).reduce((data, field) => {
    data[field] = fields[field]

    return data
  }, {})
}

module.exports = makeDataForCreate