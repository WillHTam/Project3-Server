const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  id: Number,
  first_name: String,
  last_name: String,
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  auth_token: {type: String, unique: true}
})

const User = mongoose.model('User', userSchema)

module.exports = User
