const express = require('express')
const AuthController = require('../../controllers/user/auth.controller')

const AuthRouter = express.Router()

AuthRouter.post('/login', AuthController.login)
AuthRouter.post('/register', AuthController.register)

module.exports = AuthRouter
