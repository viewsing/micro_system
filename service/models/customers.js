const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactPeople: { type: String, required: true },
  contactPhone: { type: String, required: true },
  address: { type: String, required: true },
  mark: String,
  accountName: String,
  accountBank: String,
  accountNo: String,
  userId: String
})

mongoose.model('Customer', customerSchema)
