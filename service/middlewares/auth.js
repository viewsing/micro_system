module.exports = {
  isLogin: function(req, res, next) {
    //如果是后端api接口
    if (/\/api\//.test(req.originalUrl)) {
      if (req.session.userInfo && req.session.userInfo.username) {
        next()
      } else {
        res.status(500).json({
          code: 500,
          message: '尚未登录'
        })
      }
    //静态文件之类的
    } else {
      next()
    }
  },
  isAdmin: function(req, res, next) {
    //如果是后端api接口
    if (/\/api\//.test(req.url)) {
      if (req.session.userInfo && req.session.userInfo.isAdmin) {
        next()
      } else {
        res.status(500).json({
          code: 500,
          message: '没有权限'
        })
      }
    //静态文件之类的
    } else {
      next()
    }
  }
}
