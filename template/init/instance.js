import axios from 'axios'
import Qs from 'qs'
import { merge } from 'lodash'

// 全局默认配置
axios.defaults.baseURL = window.serverConfig.connectionApi
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.timeout = 20000 // 超时时间

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  // 请求错误时做些事
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做些事
  return response
}, function (err) {
  // 请求错误时做些事
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '错误请求'
        break
      case 401:
        err.message = '未授权，请重新登录'
        window.location.href = '/'
        break
      case 403:
        err.message = '没有访问权限，拒绝访问'
        break
      case 404:
        err.message = '请求错误,未找到该资源'
        break
      case 405:
        err.message = '请求方法未允许'
        break
      case 408:
        err.message = '请求超时'
        break
      case 500:
        err.message = err.response.data.message
        break
      case 501:
        err.message = '网络未实现'
        break
      case 502:
        err.message = '网络错误'
        break
      case 503:
        err.message = '服务不可用'
        break
      case 504:
        err.message = '网络超时'
        break
      default:
        err.message = `连接错误${err.response.msg}`
    }
  } else {
    err.message = '连接到服务器失败'
    return Promise.reject(err)
  }
  return Promise.reject(err)
})

export default {
  // get请求
  get (url, param, responseType, header) {
    return axios({
      method: 'get',
      url,
      headers: merge(
        {}, header
      ),
      responseType: responseType,
      params: param || {}
    })
  },
  // post请求
  post (url, param, header) {
    return axios({
      method: 'post',
      url,
      headers: merge(
        { 'Content-Type': 'application/json' },
        header
      ),
      data: param || {}
    })
  },
  postFormData (url, params, header) {
    return axios({
      method: 'post',
      url,
      headers: merge(
        { 'Content-Type': 'application/x-www-form-urlencoded' },
        header),
      data: Qs.stringify(params) || {}
    })
  },
  // post请求
  put (url, param, header) {
    return axios({
      method: 'put',
      url,
      headers: merge(
        { 'Content-Type': 'application/json' },
        header),
      data: param || {}
    })
  },
  // delete
  del (url, param, header) {
    return axios({
      method: 'delete',
      url,
      headers: merge(
        {}, header
      ),
      params: param || {}
    })
  },
  all (values) {
    return axios.all(values)
  },
  spread (arr) {
    return axios.spread(arr)
  },
  jsonp (url, params) {
    if (!url || !params.callback) {
      console.error('Axios.JSONP 至少需要一个url参数!')
      return new Promise(resolve => {
        resolve('Axios.JSONP 至少需要一个url参数!')
      })
    }
    return new Promise((resolve) => {
      window[params.callback] = (result) => {
        resolve(result)
      }
      var JSONP = document.createElement('script')
      JSONP.type = 'text/javascript'
      JSONP.src = url + Qs.stringify(params)
      document.getElementsByTagName('head')[0].appendChild(JSONP)
      setTimeout(() => {
        document.getElementsByTagName('head')[0].removeChild(JSONP)
      }, 500)
    })
  }
}
