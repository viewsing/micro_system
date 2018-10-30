const mongoose = require('mongoose')

const storageSchema = new mongoose.Schema({
  code: { type: String, required: true },
  createTime: { type: Date, required: true },
  supplierId: { type: String, required: true },
  supplierName: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  payAmount: {type: Number, required: true },
  debtAmount: { type: Number, required: true },
  products: { type: Array, required: true },
  mark: String,
  userId: String
})

mongoose.model('Storage', storageSchema)
