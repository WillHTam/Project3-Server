const mongoose = require('mongoose')

const resourceSchema = new mongoose.Schema({
  title: String,
  url: {type: String, required: true},
  tags: [String],
  site_name: String,
  description: String,
  thumbnail: String,
  user: {type: mongoose.Schema.ObjectId, required: true, ref: 'User'},
  created_at: Date,
  updated_at: Date
})

// resourceSchema.pre('save', function (next) {
//   let now = new Date()
//   this.updated_at = now
//   if (!this.created_at) {
//     this.created_at = now
//   }
//   next()
// })

const Resource = mongoose.model('Resource', resourceSchema)

module.exports = Resource
