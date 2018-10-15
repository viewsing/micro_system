const router = require('express').Router()
const bcrypt = require('bcryptjs')

const config = require('../config')
const User = require('../models').User

/**
 * 登录
 */
router.post('/login', function(req, res, next) {
  const { username, password } = req.body
  if (username && password) {
    User.find({ username }, function(err, result) {
      if (err) next(err)
      if (result.length > 0) {
        const isCorrect = bcrypt.compareSync(password, result[0].password)
        if (isCorrect) {
          req.session.userInfo = {
            username: result[0].username,
            isAdmin: result[0].isAdmin
          }
          res.json({
            resultCode: 200,
            resultMsg: '登录成功'
          })
        } else {
          res.json({
            resultCode: 500,
            resultMsg: '密码错误'
          })
        }
      } else {
        res.json({
          resultCode: 500,
          resultMsg: '该用户不存在'
        })
      }
    })
  }
})

/**
 * 注册
 */
router.post('/signIn', function(req, res, next) {
  const { username, password } = req.body
  if (username && password) {
    //先查重
    User.find({ username }, function(err, result) {
      if (err) {
        next(err)
      }
      if (result.length > 0) {
        res.json({
          resultCode: 500,
          resultMsg: '该用户已存在'
        })
      } else {
        //密码哈希
        const hashPass = bcrypt.hashSync(password, 10)
        //创建用户
        User.create({ username, password: hashPass }, function(err, result) {
          if (err) {
            next(err)
          }
          req.session.userInfo = {
            username: result.username
          }
          res.json({
            resultCode: 200,
            resultMsg: '注册成功',
            data: { username: result.username }
          })
        })
      }

    })
  } else {
    res.json({
      resultCode: 500,
      resultMsg: '用户名和密码必填'
    })
  }
})

router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.clearCookie(config.cookie_name, { path: '/' });
  res.json({
    resultCode: 200,
    resultMsg: '退出成功'
  })
})

module.exports = router
