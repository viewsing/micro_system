const router = require('express').Router()
const Product = require('../models').Product
const { PAGE_SIZE } = require('../config')

/**
 * 根据id找产品
 */
router.get('/:id', function(req, res, next) {
  const id = req.params.id
  if (id) {
    Product.find({ _id: id }, function(err, result) {
      if (err) next(err)
      res.json({
        code: 200,
        data: result[0]
      })
    })
  } else {
    res.json({
      code: 500,
      message: '没有找到该商品'
    })
  }
})

/**
 * 获取产品列表
 */
router.get('/', function(req, res, next) {
  let { name, pageSize, page } = req.query
  pageSize = parseInt(pageSize, 10) || PAGE_SIZE
  page = parseInt(page, 10) || 1

  const queryCon = { name: { $regex: name || '' } }

  Product.countDocuments(queryCon, function(err, count) {

    Product.find(queryCon)
      .sort('-createTime')
      .limit(pageSize)
      .skip( (page - 1) * pageSize)
      .exec( function(err, result) {
        if (err) next(err)
        res.json({
          data: {
            rows: result,
            count
          },
          code: 200
        })
      })
  })

})

/**
 * 校验必填参数
 * @param req
 * @param res
 * @param next
 */
const validateParams = function(req, res, next) {
  const { code, name, type, unit } = req.body
  try {
    if (!code) throw new Error('商品编号必须')
    if (!name) throw new Error('商品名称必须')
    if (!type) throw new Error('商品类型必须')
    if (!unit) throw new Error('商品单位必须')
    next()
  } catch(err) {
    res.json({
      code: 400,
      message: err.message
    })
  }
}

/**
 * 新增产品
 */
router.put('/', validateParams, function(req, res, next) {
  const { code, name, type, unit, picture } = req.body
  const userId = req.session.userInfo.userId
  Product.create({
    code, name, type, unit,
    userId: userId || undefined,
    picture: picture || undefined
  }, function(err) {
    if (err) next(err)
    res.json({
      code: 200,
      message: '新建成功'
    })
  })
})

/**
 * 修改产品
 */
router.post('/', validateParams, function(req, res, next) {
  const { code, name, type, unit, picture, id } = req.body
  const userId = req.session.userInfo.userId
  Product.update(
    { _id: id },
    { code, name, type, unit, userId: userId || undefined, picture: picture || undefined },
    function(err) {
      if (err) next(err)
      res.json({
        code: 200,
        message: '修改成功'
      })
  })
})

/**
 * 删除产品
 */
router.delete('/', function(req, res, next) {
  const id = req.params.id
  if (id) {
    Product.remove({ _id: id }, function(err) {
      if (err) next(err)
      res.json({
        code: 200,
        message: '删除成功'
      })
    })
  } else {
    res.json({
      code: 500,
      message: 'id不能为空'
    })
  }
})

module.exports = router