import Vue from 'vue'
import VueRouter from 'vue-router'

// import store from '@/store'
import routes from './routes'

Vue.use(VueRouter)

const TITLE = Symbol.for('vue-router#title')
const router = window.router = new VueRouter({
  routes
})

Object.defineProperty(VueRouter.prototype, 'title', {
  get () {
    return router[TITLE]
  },
  set (title) {
    document.title = router[TITLE] = title
  }
})

router.beforeEach((to, from, next) => {
  router.title = to.meta && to.meta.title ? to.meta.title : ''
  next()
})

export default router
