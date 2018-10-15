const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  unit: { type: String, required: true },
  picture: String,
  userId: String
})

mongoose.model('Product', productSchema)
