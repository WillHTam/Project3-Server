const mongoose = require('mongoose')

const resourceSchema = new mongoose.Schema({
  title: {type: String, required: true},
  url: {type: String, required: true},
  tags: [String],
  site_name: String,
  summary: String,
  user: {type: mongoose.Schema.ObjectId, ref: 'User'}
})

const Resource = mongoose.model('Resource', resourceSchema)

module.exports = Resource
