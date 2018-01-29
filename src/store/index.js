import Vue from 'Vue'
import Vuex, { Store } from 'vuex'

import settings from './modules/settings'
import user from './modules/user'

import getters from './getters'

Vue.use(Vuex)

export default window.store = new Store({
  strict: true,
  getters,
  modules: { settings, user }
})
