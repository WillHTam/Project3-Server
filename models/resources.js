const mongoose = require('mongoose')
const userSchema = require('./user')

const resourceSchema = new mongoose.Schema({
  id: Number,
  title: {type: String},
  url: String,
  tags: [],
  user: [userSchema.schema]
})

const Resource = mongoose.model('Resource', resourceSchema)

module.exports = Resource
