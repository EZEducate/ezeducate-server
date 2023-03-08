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

function getNameFromEmail(email) {
  return email.split('@')[0]
}
function generateRefreshToken(user) {
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
}
function generateAccessToken(user) {
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
}

module.exports = {
  generateRandomPassword,
  generateAuthToken,
  getNameFromEmail,
  generateAccessToken,
  generateRefreshToken,
}
