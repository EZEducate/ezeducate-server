const createHttpError = require('http-errors')
const { register, login } = require('../../validations/auth')
const sendEmail = require('../../../plugins/nodemailer')
const UserModel = require('../../modules/User')
const { generateRandomPassword } = require('../../../plugins/helpers')
const jwt = require('jsonwebtoken')
const AuthController = {
  login: async function (req, res, next) {
    const { email, password } = req.body
    try {
      await login.validateAsync(req.body)
      const existed_user = await UserModel.findOne({
        email,
        status: 'active',
      })
      if (!existed_user) return next(createHttpError(400, 'User not found'))
      const is_valid_password = existed_user.validatePassword(password)
      if (!is_valid_password)
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
      const access_token = AuthController.generateAccessToken(existed_user)
      const refresh_token = AuthController.generateRefreshToken(existed_user)

      const token = {
        access_token,
        refresh_token,
      }
      return res.status(200).json({
        success: true,
        token,
      })
    } catch (error) {
      next(createHttpError(500, error.message))
    }
  },
  register: async function (req, res, next) {
    const { email } = req.body
    try {
      await register.validateAsync(req.body)
      UserModel.findOne({
        email,
      }).exec((err, user) => {
        if (err) return next(createHttpError(500, err.message))
        if (user) return next(createHttpError(400, 'Email already exists'))
      })
      const name = AuthController.getNameFromEmail(email)
      let user_model = new UserModel({
        email,
        name,
      })
      const password = generateRandomPassword()
      await user_model.setPassword(password)
      const new_user = await user_model.save()
      if (!new_user) {
        return next(createHttpError(500, error.message))
      }
      const options = {
        to: email,
        subject: 'Welcome to EZ Education Platform',
        text: `Hi ${name}! Welcome to EZ Education Platform`,
        content: `<b>Welcome to EZ Education Platform</b> <br>
        <p>Here is your password: <b>${password}<b> </p>
        <br>
         Don't tell other the password`,
      }
      sendEmail(options)
      return res.status(200).json({
        success: true,
      })
    } catch (error) {
      next(createHttpError(500, error.message))
    }
  },
  getNameFromEmail: function (email) {
    return email.split('@')[0]
  },
  generateRefreshToken: function (user) {
    return jwt.sign(
      {
        id: user._id,
        name: user.name,
        status: user.status,
        verified: user.verified,
      },
      process.env.USER_REFRESH_TOKEN_KEY,
      {
        expiresIn: '365d',
      }
    )
  },
  generateAccessToken: function (user) {
    return jwt.sign(
      {
        id: user._id,
        status: user.status,
        name: user.name,
        verified: user.verified,
      },
      process.env.USER_ACCESS_TOKEN_KEY,
      {
        expiresIn: '1',
      }
    )
  },
}

module.exports = AuthController
