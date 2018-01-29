import Vue from 'vue'

import store from '@/store'

const cache = {
  defaultImage: 'http://s.lxiaobao.com/@/monitor-web/static/res/efbbbbdb.png',
  get auditStates () {
    if (cache['__auditStates__']) return cache['__auditStates__']
    cache['__auditStates__'] = store.state.settings.auditStates
    return cache['__auditStates__']
  },
  get clubLevels () {
    if (cache['__clubLevels__']) return cache['__clubLevels__']
    cache['__clubLevels__'] = store.state.settings.clubLevels
    return cache['__clubLevels__']
  },
  getValueForArray (cacheKey) {
    return function (value, field) {
      const obj = cache[cacheKey].find(state => state.value === value)
      return field && obj.hasOwnProperty(field) ? obj[field] : field
    }
  },
  getValue (key) {
    return function (value) {
      return value || cache[key]
    }
  }
}

Vue.filter('defaultImage', cache.getValue('defaultImage'))
Vue.filter('auditState', cache.getValueForArray('auditStates'))
Vue.filter('clubLevel', cache.getValueForArray('clubLevel'))
