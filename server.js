const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const db = require('./plugins/db')
var createError = require('http-errors')
require('dotenv').config()
const createHttpErrors = require('http-errors')
const app = express()
dotenv.config()
app.use(cors())
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: false }))

app.use('/api', require('./api/index'))

app.use(require('./api/middleware/handleError'))
const port = process.env.PORT || 5000
app.listen(port, () => {
  db()
  console.log('The server listening on port ' + port)
})
