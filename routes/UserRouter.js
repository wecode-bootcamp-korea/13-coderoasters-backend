const express = require('express')
const router = express.Router()

const { validateGoogleToken } = require('../middleware')
const { UserController } = require('../controllers')

router.post('/signup', UserController.signUp)
router.post('/login', UserController.logIn)
router.post('/googlelogin', validateGoogleToken, UserController.googleLogIn)

module.exports = router