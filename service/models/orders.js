const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  code: { type: String, required: true },
  createTime: { type: Date, required: true },
  customerId: { type: String, required: true },
  cutomerName: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  paymentAmount: { type: Number, required: true },
  debtAmount: { type: Number, required: true },
  products: { type: Array, required: true },
  mark: String,
  userId: String
})

mongoose.model('Order', orderSchema)
