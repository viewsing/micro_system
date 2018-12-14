import vue from 'vue'
import vueInstance from '../utils/vueInstance'

//根据url生成基本地址和params的key，例如 users/:id ，得到 users/ 和 id
function splitUrl (url) {
  const arr = url.split(':')
  return {
    url: arr[0],
    key: arr[1]
  }
}

//遍历 url 列表，生成requests
export default function buildApi (urls) {
  const requests = {}

  Object.keys(urls).forEach( function(name) {
    //根据url配置生成 基本请求设置
    const detail = urls[name]
    const isObj = typeof detail === 'object'
    //基本请求地址和路由参数
    const urlAndKey = isObj ? splitUrl(detail.url) : splitUrl(detail)
    //方法类型
    const method = isObj ? detail.method : 'get'
    //单条请求方法
    requests[name] = async function(params, noTips) {
      //路由地址和路由参数key
      const { url, key } = urlAndKey
      if (key && !(key in params)) {
        vueInstance.$Message.error(`${key} 不能为空`)
        return
      }

      try {
        //响应结果
        const result = await vue.axios({
          method,
          url: key ? url + params[key] : url,
          data: params,
        })
        if (result.code !== 200) throw { code: result.code, message: result.message }
        //响应成功返回值
        return { data: result.data || true }
      } catch (err) {
        //响应错误处理
        if (!noTips) {
          if (err.status) {
            vueInstance.$Message.error( err.data.message || '系统错误')
            return { error: err.data.message, code: err.data.code || err.status }
          } else {
            vueInstance.$Message.error( err.message )
            return { error: err.message, code: err.code }
          }
        }
      }
    }
  })

  return requests
}
