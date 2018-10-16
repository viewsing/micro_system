module.exports = {
  isLogin: function(req, res, next) {
    //如果是后端api接口
    if (/\/api\//.test(req.url)) {
      if (req.session.userInfo && req.session.userInfo.username) {
        next()
      } else {
        res.json({
          resultCode: 500,
          resultMsg: '尚未登录'
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
        res.json({
          resultCode: 500,
          resultMsg: '没有权限'
        })
      }
    //静态文件之类的
    } else {
      next()
    }
  }
}
