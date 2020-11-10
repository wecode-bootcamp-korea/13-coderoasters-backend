const { AUTH_TOKEN_SALT } = process.env
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { UserService } = require('../services')
const errorGenerator = require('../utils/errorGenerator')

const signUp = async (req, res, next) => {
  try {
    const { email, password, first_name, last_name, mobile_number } = req.body
    const validatedEmail = await UserService.emailValidation(email)

    if (!validatedEmail) errorGenerator({ statusCode: 400, message: 'Please enter the correct email format' })

    const validatedPassword = await UserService.passwordValidation(password)

    if (!validatedPassword) errorGenerator({ statusCode: 400, message: 'Please enter at least 8 digits' })

    const hashPassword = await bcrypt.hash(password, 12)
    const foundUser = await UserService.findUser({ email })

    if (foundUser) errorGenerator({ statusCode: 409, message: 'duplicated' })

    const createUser = await UserService.createUser({
      email,
      password: hashPassword,
      first_name,
      last_name,
      mobile_number
    })

    res.status(201).json({
      message: 'user created',
      user_id: createUser.id,
    })
  } catch (err) {
    next(err)
  }
}

const logIn = async (req, res, next) => {
  try {
    const { email, password: inputPassword } = req.body
    const foundUser = await UserService.findUser({ email })

    if (!foundUser) errorGenerator({ statusCode: 400, message: 'client input invalid' })

    const { id, password: hashedPassword } = foundUser
    const isValidPassword = await bcrypt.compare(inputPassword, hashedPassword)

    if (!isValidPassword) errorGenerator({ statusCode: 400, message: 'client input invalid' })

    const token = jwt.sign({ id }, AUTH_TOKEN_SALT, { expiresIn: '24h' })
    res.status(200).json({ message: 'login success!', token })
  } catch (err) {
    next(err)
  }
}

const googleLogIn = async (req, res, next) => {
  try {
    const { email } = req.payload
    const foundUser = await UserService.findUser({ email })
    
    if (!foundUser) await UserService.createUser({ email })
   
    const { id } = await UserService.findUser({ email })
    const token = jwt.sign({ id }, AUTH_TOKEN_SALT, { expiresIn: '24h' })
    res.status(200).json({ message: 'login success!', token })
  } catch (err) {
    next(err)
  }
}
module.exports = {
  signUp,
  logIn,
  googleLogIn,
}