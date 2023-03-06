const Joi = require('joi')

const register = Joi.object({
  username: Joi.string().required().messages({
    'string.base': 'Username should be string',
    'string.empty': 'Username should not be empty!',
    'any.required': 'Username is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Valid email required',
    'string.empty': 'Email should not be empty!',
    'any.required': 'Email is required',
  }),
  name: Joi.string().required().messages({
    'string.base': 'Name should be string',
    'string.empty': 'Name should not be empty!',
    'any.required': 'Name is required',
  }),
})

const login = Joi.object({
  username: Joi.string().required().messages({
    'string.username': 'Valid username required',
    'string.empty': 'Username should not be empty!',
    'any.required': 'Username is required',
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
