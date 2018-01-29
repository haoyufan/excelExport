import axios from 'axios'

// See: https://eggjs.org/zh-cn/plugins/security.html#container
axios.defaults.xsrfCookieName = 'csrfToken'
axios.defaults.xsrfHeaderName = 'x-csrf-token'

export function requestGET (url, params, options) {
  return axios.get(url, Object.assign({ params }, options))
    .then(res => res.data)
    .catch(handleError)
}

export function requestPUT (url, data, options) {
  return axios.put(url, data, options)
    .then(res => res.data)
    .catch(handleError)
}

export function requestPOST (url, data, options) {
  return axios.post(url, data, options)
    .then(res => res.data)
    .catch(handleError)
}

function handleError (error) {
  const { response } = error

  if (response.status !== 404) {
    const errorMsg = response.data && response.data.message ? response.data.message : '无效请求'
    // eslint-disable-next-line
    return Promise.reject({ status: response.status, message: errorMsg })
  }

  // eslint-disable-next-line
  return Promise.reject({ status: 404, message: '网络异常或资源不存在' })
}
