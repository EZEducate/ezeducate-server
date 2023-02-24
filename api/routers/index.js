const express = require('express')
const AuthRouter = require('./user/auth.router')

module.exports = function (app) {
  app.use('/user/', AuthRouter)
}
