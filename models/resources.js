const mongoose = require('mongoose')
const userSchema = require('./user')

const resourceSchema = new mongoose.Schema({
  id: {type: String, required: true},
  title: {type: String, required: true},
  url: {type: String, required: true},
  tags: []
})

const Resource = mongoose.model('Resource', resourceSchema)

module.exports = Resource
