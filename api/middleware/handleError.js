module.exports = (error, req, res, next) => {
  return res.json({
    success: false,
    status: error.status || 500,
    message: error.message || 'Something went wrong. Please try again later.',
  })
}
