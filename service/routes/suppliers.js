const router = require('express').Router()
const Supplier = require('../models').Supplier

router.get('/', function(req, res, next) {
  Supplier.find({}, function(err, result) {
    if (err) return next(err)
    res.json(
      {
        resultCode: 200,
        data: result.map(supplier => ({
          id: supplier._id,
          name: supplier.name,
          contactPeople: supplier.contactPeople,
          contactPhone: supplier.contactPhone,
          address: supplier.address,
          mark: supplier.mark
        }))
      }
    )
  })
})

router.get('/:id', function(req, res, next) {
  if (req.params.id) {
    Supplier.findById(req.params.id, function(err, result) {
      if (err) return next(err)
      res.json({
        resultCode: 200,
        data: result
      })
    })
  } else {
    res.json({
      resultCode: 500,
      resultMsg: '缺少供应商id参数'
    })
  }
})

//参数校验中间件
const validateParams = function(req, res, next) {
  const params = req.body
  try {
    if (!params.name) throw { text: '供应商名称必填' }
    if (!params.contactPeople) throw { text: '联系人必填' }
    if (!params.contactPhone) throw { text: '联系方式必填' }
    if (!params.address) throw { text: '联系地址必填' }
    next()
  } catch (err) {
    res.json({
      resultCode: 500,
      resultMsg: err.text
    })
  }
}

router.post('/', validateParams, function(req, res, next) {
  const params = req.body
  Supplier.findOneAndUpdate(req.body.id, { ...params }, function(err, result) {
    if (err) return next(err)
    res.json({
      resultCode: 200,
      resultMsg: '修改成功'
    })
  })
})

router.put('/', validateParams, function(req, res, next) {
  const params = req.body
  Supplier.create({ ...params }, function(err, result) {
    if (err) return next(err)
    res.json({
      resultCode: 200,
      resultMsg: '新建成功'
    })
  })
})

module.exports = router
