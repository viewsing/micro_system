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

//遍历生成请求方法
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
      if (key && (! key in params)) {
        vueInstance.$Message.error(`${key} 不能为空`)
        return
      }

      try {
        const result = await vue.axios({
          method,
          url: key ? url + params[key] : url,
          data: params,
        })
        if (result.code !== 200) throw { code: result.code, message: result.message }
        return result.data || true
      } catch (err) {
        if (!noTips) {
          vueInstance.$Message.error(err.message)
        }
      }
    }
  })

  return requests
}
