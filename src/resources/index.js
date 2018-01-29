import Vue from 'vue'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/reset.css'
import 'element-ui/lib/theme-chalk/index.css'

import Page from './components/Page.vue'
import Window from './components/Window.vue'

import './filters'

Vue.use(ElementUI, { size: 'mini' })

// 自定义组件
Vue.component(Window.name, Window)
Vue.component(Page.name, Page)
