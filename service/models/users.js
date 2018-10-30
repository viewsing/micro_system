const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  salt: String,
  isAdmin: Boolean
})

mongoose.model('User', userSchema)
