const path = require('path')

const Express = require('express')
const config = require('./config')
const session = require('express-session')
const bodyParser = require('body-parser')
const compression = require('compression')

const router = require('./routes')
//连接数据库
require('./models')

const app = new Express()

//session
app.use(session({
  name: config.cookie_name,
  secret: '23r4vf34t134__ms_session',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly:false },
}))

//请求体解析前
//_readableState,readable,domain,_events,_eventsCount,_maxListeners,socket,connection,httpVersionMajor,
//httpVersionMinor,httpVersion,complete,headers,rawHeaders,trailers,rawTrailers,upgrade,url,method,statusCode,
//statusMessage,client,_consuming,_dumped,next,baseUrl,originalUrl,_parsedUrl,params,query,res,_parsedOriginalUrl,sessionStore,sessionID,session
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
//请求体解析后
//_readableState,readable,domain,_events,_eventsCount,_maxListeners,socket,connection,httpVersionMajor,
//httpVersionMinor,httpVersion,complete,headers,rawHeaders,trailers,rawTrailers,upgrade,url,method,statusCode,
//statusMessage,client,_consuming,_dumped,next,baseUrl,originalUrl,_parsedUrl,params,query,res,_parsedOriginalUrl,sessionStore,sessionID,session,body

//请求日志
app.use(function(req, res, next) {
  console.log(`${req.method} ${req.url}`)
  next()
})

//gzip
app.use(compression())

//静态文件服务器
app.use( Express.static(path.join(__dirname, '../dist')) )
app.use( Express.static(path.join(__dirname, './uploads')) )
app.use( Express.static(path.join(__dirname, '../public')))

//如果没有设置环境变量或者设置为development时，设置跨域
if (app.get('env') === 'development') {
  app.use(function (req, res, next) {

      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);
      if(req.method === 'OPTIONS'){
        res.send(200)/*让options请求快速返回*/
      } else {
        next()
      }
  });
}



//路由
app.use('/api', router)

//单页面应用确保react-router刷新正确路由
app.get('*', function (req, res) {
  res.send('没有找到')
});


//错误处理，4个参数，是异步执行的
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).json({
    code: 500,
    message: err.message || '未知错误'
  })
})

app.listen(config.PORT)

console.log('服务器已启动，正在监听 ' + config.PORT + ' 端口...')
