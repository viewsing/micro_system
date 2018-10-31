import Vue from 'vue'
import Vuex from 'vuex'
import service from '../service/index'
import suppliers from './suppliers'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    suppliers,
  },
  state: {
    menuItems: [],
    activeMenu: {},
    isLogin: false,
    loginModal: false,
    loading: true,
  },
  mutations: {
    //更新菜单项
    updateMenus (state, payload) {
      const menuItems = []
      payload.forEach( route => {
        if (route.meta.type === 'menu') {
          menuItems.push({ path: route.path, name: route.name })
        }
      })
      state.menuItems = menuItems
    },
    //更新选中菜单
    updateActiveMenu (state, payload) {
      state.activeMenu = Object.assign({}, payload)
    },
    //切换登录模态框
    toggleLoginModal (state) {
      state.loginModal = !state.loginModal
    },
    //更新登录状态
    updateLogin (state, payload) {
      state.isLogin = payload
    },
    //切换是否loading
    toggleLoading (state) {
      state.loading = !state.loading
    }
  },
  actions: {
    async login (context, payload) {
      const data = await service.login(payload)
      if (data) {
        context.commit('toggleLoginModal')
        //登录后回到首页，更新登录信息
        context.commit('updateLogin', true)
        localStorage.setItem('userInfo', JSON.stringify(data))
      } else {
        //iview的modal太傻了，loading设置为false会直接关闭模态框，所以要每次点击前设置为true。又因为vue的渲染是异步的，所以要用定时器在下一次轮询时再设置为true
        context.commit('toggleLoading')
        setTimeout(function(){
          context.commit('toggleLoading')
        }, 0)
      }
    },
    async logout (context) {
      const data = await service.logout()
      if (data) {
        context.commit('updateLogin', false)
        localStorage.removeItem('userInfo')
      }
    }
  }
})
