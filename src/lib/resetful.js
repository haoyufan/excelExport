import { requestGET, requestPUT } from './request'

export function createEndpoint (name) {
  return {
    all (data, options) {
      return requestGET(`/api/${name}`, data, options)
    },
    one (id, data, options) {
      return requestGET(`/api/${name}/${id}`, data, options)
    },
    create () {
      // todo: 待实现
    },
    edit (id, data, options) {
      // todo: 待实现
    },
    update (id, data, options) {
      return requestPUT(`/api/${name}/${id}`, data, options)
    },
    destroy (id, options) {
      // todo: 待实现
    }
  }
}

export default { endpoint: createEndpoint }
