const router = require('express').Router()
const Supplier = require('../models').Supplier
const { PAGE_SIZE } = require('../config')

router.get('/:id', function(req, res, next) {
  if (req.params.id) {
    Supplier.findById(req.params.id, function(err, result) {
      if (err) return next(err)
      res.status(200).json({
        code: 200,
        data: result
      })
    })
  } else {
    res.status(500).json({
      code: 500,
      message: '缺少供应商id参数'
    })
  }
})

/**
 * 注意顺序，要放在下面，不然获取详情匹配不上
 */
router.get('/', function(req, res, next) {
  let { pageSize, page, name } = req.query
  pageSize = parseInt(pageSize, 10) || PAGE_SIZE
  page = parseInt(page, 10) || 1
  const queryCon = { name: { $regex: name || ''} }

  Supplier.countDocuments(queryCon, function(err, count) {
    if (err) return next(err)

    Supplier.find(queryCon)
    .sort('-createTime')
    .limit(pageSize)
    .skip( (page-1) * pageSize )
    .exec(function(err, result) {
      if (err) return next(err)

      res.status(200).json({
        code: 200,
        data: {
          rows: result.map(supplier => ({
            id: supplier._id,
            name: supplier.name,
            contactPeople: supplier.contactPeople,
            contactPhone: supplier.contactPhone,
            address: supplier.address,
            mark: supplier.mark
          })),
          count
        }
      })

    })
  })
})

//参数校验中间件
const validateParams = function(req, res, next) {
  const params = req.body
  try {
    if (!params.name) throw new Error('供应商名称必填')
    if (!params.contactPeople) throw new Error('联系人必填')
    if (!params.contactPhone) throw new Error('联系方式必填')
    if (!params.address) throw new Error('联系地址必填')
    next()
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err.message
    })
  }
}

router.post('/', validateParams, function(req, res, next) {
  const params = req.body
  if (!params.id) {
    res.status(500).json({
      code: 500,
      message: '没有找到该用户'
    })
  }
  Supplier.findByIdAndUpdate(req.body.id, { ...params }, function(err) {
    if (err) return next(err)
    res.status(200).json({
      code: 200,
      message: '修改成功'
    })
  })
})

router.put('/', validateParams, function(req, res, next) {
  const { name, contactPeople, contactPhone, address,
    mark, accountName, accountBank, accountNo } = req.body
  const userId = req.session.userInfo.userId
  Supplier.create({
    name, contactPeople, contactPhone, address, userId,
    mark: mark || undefined,
    accountName: accountName || undefined,
    accountBank: accountBank || undefined,
    accountNo: accountNo || undefined,
  }, function(err) {
    if (err) return next(err)
    res.status(200).json({
      code: 200,
      message: '新建成功'
    })
  })
})

router.delete('/:id', function(req, res, next) {
  const id = req.params.id
  if (!id) {
    res.status(500).json({
      code: 500,
      message: '参数错误'
    })
  } 
  Supplier.deleteOne({ _id: id }, function(err) {
    if (err) return next(err)
    res.status(200).json({
      code: 200,
      message: '删除成功'
    })
  })
})

module.exports = router
