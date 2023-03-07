module.exports = (error, req, res, next) => {
  switch (error.status) {
    case 401:
      return res.status(401).json({
        success: false,
        message: error.message || 'Invalid token',
      })

    default:
      return res.status(200).json({
        success: false,
        message:
          error.message || 'Something went wrong. Please try again later.',
      })
  }
}
