import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import './resources'

Vue.config.productionTip = false

/**
 * 创建 Vue 应用
 * @returns {CombinedVueInstance<V extends Vue, Object, Object, Object, Record<never, any>>}
 */
function createApplication () {
  return new Vue({
    // el: '#app',
    router,
    store,
    render: h => h(App)
  })
}

/**
 * 启动前处理任务
 *
 * @returns {Promise.<void>}
 */
async function beforeStart () {
  await store.dispatch('user/getUserInfo')
}

/**
 * 启动后处理任务
 * @param app
 * @returns {Promise.<void>}
 */
async function afterStart (app) {
  app.$mount('#app')
}

beforeStart()
  .catch(() => Promise.resolve())
  .then(createApplication)
  .then(afterStart)
