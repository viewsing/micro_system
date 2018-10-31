import vueInstance from '../utils/vueInstance'
import service from '../service/index'

export default {
  namespaced: true,
  state: {
    rows: [],
    page: 1,
    count: 0,
    pageSize: 10,
    loading: false,
    openParams: {},
    showDetail: false, //是否显示详情页
    formItem: {
      name: '',
      contactPeople: '',
      contactPhone: '',
      address: '',
      mark: '',
      accountName: '',
      accountBank: '',
      accountNo: ''
    } //详情页表单数据
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
    updatePageSize (state, payload) {
      state.pageSize = payload
    },
    updatePage (state, payload) {
      state.page = payload
    },
    toggleShowDetail (state, payload) {
      state.showDetail = payload
    },
    //进入详情的参数
    updateOpenParams (state, payload) {
      state.openParams = payload
    },
    //更新详情页表单数据
    updateFormItem (state, payload) {
      const key = payload.target.name
      const value = payload.target.value
      state.formItem = { ...state.formItem, [key]: value }
    },
    //更新供应商详情数据
    updateDetail (state, payload) {
      state.formItem = {
        name: payload.name,
        contactPeople: payload.contactPeople,
        contactPhone: payload.contactPhone,
        address: payload.address,
        mark: payload.mark,
        accountName: payload.accountName,
        accountBank: payload.accountBank,
        accountNo: payload.accountNo,
        id: payload._id
      }
    },
  },
  actions: {
    /**
     * 列表搜索
     * @param context
     * @param payload
     * @returns {Promise<void>}
     */
    async onSearch (context, payload) {
      context.commit('toggleLoading')
        const data = await service.getSuppliers({
          page: context.state.page,
          pageSize: context.state.pageSize,
          name: payload
        })
      if (data) {
        context.commit('updateData', data)
        context.commit('toggleLoading')
      } else {
        context.commit('toggleLoading')
      }
    },
    async changePageSize (context, payload) {
      context.commit('updatePageSize', payload)
      context.dispatch('onSearch')
    },
    async changePage (context, payload) {
      context.commit('updatePage', payload)
      context.dispatch('onSearch')
    },
    /**
     * 详情
     * @param context
     * @param payload
     * @returns {Promise<void>}
     */
    async getSupplierById (context, payload) {
      context.commit('toggleLoading')
      const data = await service.getSupplierById({id: payload})
      if (data) {
        context.commit('updateDetail', data)
        context.commit('toggleLoading')
      } else {
        context.commit('toggleLoading')
      }
    },
    /**
     * 新增
     * @param context
     * @returns {Promise<void>}
     */
    async putSupplier (context) {
      context.commit('toggleLoading')
      const data = await service.putSupplier({
        ...context.state.formItem
      })
      if (data) {
        vueInstance.$Message.success('新增成功')
        context.commit('toggleLoading')
        //返回列表，并刷新列表
        context.commit('toggleShowDetail')
        context.dispatch('onSearch')
      } else {
        context.commit('toggleLoading')
      }
    },
    /**
     * 编辑修改
     * @param context
     * @param payload
     * @returns {Promise<void>}
     */
    async postSupplier (context) {
      context.commit('toggleLoading')
      const data = await service.postSupplier({
        ...context.state.formItem
      })
      if (data) {
        vueInstance.$Message.success('修改成功')
        context.commit('toggleLoading')
        //返回并刷新列表
        context.commit('toggleShowDetail')
        context.dispatch('onSearch')
      } else {
        context.commit('toggleLoading')
      }
    },
    /**
     * 删除
     * @param context
     * @param payload
     * @returns {Promise<boolean>}
     */
    async delSupplier (context, payload) {
      context.commit('toggleLoading')
      const data = await service.deleteSupplier({id: payload})
      if (data) {
        vueInstance.$Message.success('删除成功')
        context.commit('toggleLoading')
        context.dispatch('onSearch')
        return true
      } else {
        context.commit('toggleLoading')
        return false
      }
    }
  }
}
