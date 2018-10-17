import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: '首页',
      meta: {
        type: 'menu',
      },
      component: Home
    },
    {
      path: '/supplier',
      name: '供应商管理',
      meta: {
        type: 'menu',
        requireAuth: true
      },
      component: () => import(/* webpackChunkName: "about" */ './views/Supplier.vue')
    },
  ]
})
