import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/iview.js'
import vueInstance from './utils/vueInstance'

Vue.config.productionTip = false

//先鉴权
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (store.state.isLogin) {  // 根据store中判断是否登录
      next();
    }
    else {
      vueInstance.$Message.error('尚未登录')
      // next({
      //     path: '/login',
      //     query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      // })
    }
  }
  else {
    next();
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
