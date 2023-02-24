const express = require('express')
const AuthController = require('../../controllers/user/auth.controller')

const AuthRouter = express.Router()

AuthRouter.get('/login', AuthController.login)

module.exports = AuthRouter
