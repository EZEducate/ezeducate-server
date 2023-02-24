const createHttpError = require('http-errors')

const AuthController = {
  login: function (req, res, next) {
    try {
    } catch (error) {
      next(createHttpError(500, error.message))
    }
  },
  register: function (req, res, next) {
    try {
        
    } catch (error) {
      next(createHttpError(500, error.message))
    }
  },
}

module.exports = AuthController
