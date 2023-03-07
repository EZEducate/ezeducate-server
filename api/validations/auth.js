const Joi = require('joi')

const register = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Valid email required',
    'string.empty': 'Email should not be empty!',
    'any.required': 'Email is required',
  }),
})

const login = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Valid email required',
    'string.empty': 'Email should not be empty!',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(6).max(8).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'string.max': 'Password must be at max 8 characters',
    'string.empty': 'Password should not be empty!',
    'any.required': 'Password is required!',
  }),
})

module.exports = {
  register,
  login,
}
