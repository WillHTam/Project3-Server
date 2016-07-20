const mongoose = require('mongoose')

const resourceSchema = new mongoose.Schema({
  title: String,
  url: {type: String, required: true},
  tags: [String],
  site_name: String,
  summary: String,
  thumbnail: String,
  user: {type: mongoose.Schema.ObjectId, ref: 'User'}
})

const Resource = mongoose.model('Resource', resourceSchema)

module.exports = Resource
