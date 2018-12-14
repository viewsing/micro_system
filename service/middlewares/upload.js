const path = require('path')
const fs = require('fs')

const router = require('express').Router()
const formidable = require('formidable')
const config = require('../config')

router.post('/', function (req, res, next) {
  const form = new formidable.IncomingForm()
  form.uploadDir = path.join(__dirname, '../tmp')

  form.parse(req, function(err, fields, files) {
    if (err) next(err)

    for (let item in files) {
      let file = files[item]

      //原本的文件临时路径
      const tmpFilePath = file.path
      //原本的文件名
      const fileName = file.name
      //文件类型
      const fileType = file.type
      //文件扩展名，默认取文件名中的扩展名，没有则从文件类型中截取
      let extName = (fileName.indexOf('.') > -1) ? fileName.slice(fileName.indexOf('.')) : ''
      if (extName === '' && fileType.indexOf('/') > -1) {
        extName = '.' + fileType.slice(fileType.indexOf('/') + 1)
      }
      //生成文件新名字
      const newFileName = Math.random().toString().slice(2) + extName
      //新的文件路径
      const newFilePath = path.join(__dirname, '..', config.uploadFolder, newFileName)

      //不会自动创建文件夹
      fs.rename(tmpFilePath, newFilePath, function(err) {
        if (err) {
          console.log(err)
          res.status(500)
            .json({
            code: 500,
            message: '服务器错误'
          })
        } else {
          console.log(`文件已重命名为 ${newFileName}`)
          res.status(200).json({
            code: 200,
            data: 'http://' + config.uploadServer + ':' + config.PORT  + '/' + newFileName
          })
        }
      })
    }

  })
})

module.exports = router