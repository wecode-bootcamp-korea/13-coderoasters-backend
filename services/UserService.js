const prisma = require('../prisma')
const makeDataForCreate = require('../utils/makeDataForCreate')

const createUser = (fields) => {
  const data = makeDataForCreate(fields)
  return prisma.users.create({ data })
}

const findUser = (field) => {
  const [uniqueKey] = Object.keys(field)
  return prisma.users.findOne({ where: { [uniqueKey]: field[uniqueKey] } })
}

const emailValidation = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email.toLowerCase())
}

const passwordValidation = (password) => {
  return password.length >= 8 ? true : false
}

module.exports = {
  createUser,
  findUser,
  emailValidation,
  passwordValidation,
}