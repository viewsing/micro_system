import Vue from 'vue'
import loader from '../service'

export default {
  namespaced: true,
  state: {
    rows: [],
    page: 1,
    count: 0,
    pageSize: 10,
    loading: false,
    openParams: {}
  },
  getters: {},
  mutations: {
    toggleLoading (state) {
      state.loading = !state.loading
    },
    updateData (state, payload) {
      state.rows = payload.rows
      state.count = payload.count
    },
    onUpdatePageSize (state, payload) {
      state.pageSize = payload
    },
    //进入详情的参数
    onOpenDetail (state, payload) {
      state.openParams = payload
    }
  },
  actions: {
    async onSearch (context, payload) {
      context.commit('toggleLoading')
      try {
        const result = await Vue.axios.get(loader.suppliers, {
          params: {
            page: context.state.page,
            pageSize: context.state.pageSize,
            name: payload
          }
        })
        context.commit('updateData', result.data)
        context.commit('toggleLoading')
      } catch (err) {
        context.commit('toggleLoading')
        console.log(err)
      }
    }
  }
}
