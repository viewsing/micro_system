const mongoose = require('mongoose')
const config = require('../config')

//连接服务器
mongoose.connect(config.db, {
  server: { poolSize: 20 }
})

mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB 连接出错:'));

//数据库连接事件
db.on('open', () => {
  console.log('MongoDB已经成功连接')
})


require('./users')
require('./suppliers')
require('./products')
require('./customers')
require('./orders')
require('./storages')

module.exports = {
  User: mongoose.model('User'),
  Supplier: mongoose.model('Supplier'),
  Product: mongoose.model('Product'),
  Cutomer: mongoose.model('Customer'),
  Order: mongoose.model('Order'),
  Storage: mongoose.model('Storage')
}
