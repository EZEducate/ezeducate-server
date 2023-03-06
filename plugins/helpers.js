const jwt = require('jsonwebtoken')

const generateRandomPassword = () => {
  const length = 8
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let password = ''
  for (let i = 0, n = charset.length; i < length; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n))
  }
  return password
}

const generateAuthToken = (email, name, user_id) => {
  return jwt.sign({ email, name, user_id }, process.env.USER_TOKEN_KEY, {
    algorithm: 'RS256',
  })
}

module.exports = {
  generateRandomPassword,
  generateAuthToken,
}
