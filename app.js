const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')

const mongoose = require('mongoose')
mongoose.connect('mongodb://cat:cat@ds051645.mlab.com:51645/project3')

const logger = require('morgan')
const appController = require('./controllers/application_controller')
const port = process.env.PORT || 3000
var routes = require('./routes/index')

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const User = require('./models/user')

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, User-Email, Auth-Token')
  next()
})

app.use('/', routes)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
