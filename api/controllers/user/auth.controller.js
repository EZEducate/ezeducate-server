const createHttpError = require('http-errors')
const { register, login } = require('../../validations/auth')
const { sendConfirmationEmail } = require('../../../plugins/nodemailer')
const UserModel = require('../../modules/User')
const { generateRandomPassword } = require('../../../plugins/helpers')
const jwt = require('jsonwebtoken')
const AuthController = {
  login: async function (req, res, next) {
    const { username, password } = req.body
    try {
      await login.validateAsync(req.body)
      const existed_user = await UserModel.findOne({
        username,
      })
      if (!existed_user) return next(createHttpError(400, 'User not found'))
      const isValidPassword = existed_user.validatePassword(password)
      if (!isValidPassword)
        return next(createHttpError(400, 'Invalid password'))
      if (!existed_user.verified)
        await UserModel.updateOne(
          {
            _id: existed_user._id,
          },
          {
            $set: {
              verified: true,
            },
          }
        )
      const token = jwt.sign(
        {
          id: existed_user._id,
          username: existed_user.username,
          email: existed_user.email,
          name: existed_user.name,
          status: existed_user.status,
        },
        process.env.USER_TOKEN_KEY,
        {
          expiresIn: '1d',
        }
      )
      return res.status(200).json({
        success: true,
        token,
      })
    } catch (error) {
      next(createHttpError(500, error.message))
    }
  },
  register: async function (req, res, next) {
    const { username, email } = req.body
    try {
      await register.validateAsync(req.body)
      const existed_user = await UserModel.findOne({
        username,
        email,
      })
      if (existed_user) return next(createHttpError(400, 'User already exists'))
      let user_model = new UserModel(req.body)
      const password = generateRandomPassword()
      await user_model.setPassword(password)
      const user = await user_model.save()
      if (user) {
        sendConfirmationEmail(user, password)
        return res.status(200).json({
          success: true,
        })
      }
      next(createHttpError(500, 'Cannot register'))
    } catch (error) {
      next(createHttpError(500, error.message))
    }
  },
}

module.exports = AuthController
