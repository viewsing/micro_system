<template>
  <div class="supplier">
    <div v-if="!showDetail" class="supplier-list">
      <div class="header" style="position: relative;">
        <Form ref="formInline" :model="formInline" inline @submit.native.prevent >
          <FormItem prop="name">
              <Input v-model="formInline.name" placeholder="供应商名称" />
          </FormItem>
          <FormItem>
              <Button type="primary" @click="onSearch(formInline.name)">搜索</Button>
          </FormItem>
        </Form>
        <Button type="primary" style="position: absolute; right: 0; top: 0px;" @click="onOpenAdd" >新增</Button>
      </div>
      <Table border :columns="columns" :data="rows" :loading="loading"></Table>
      <Page style="margin-top: 1em;" @on-page-size-change="onUpdatePageSize" :total="count" show-sizer :page-size="pageSize" :current="page" size="small" />
    </div>
    <SupplierDetail v-else @close-detail="onCloseDetail"/>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import SupplierDetail from './SupplierDetail.vue'
export default {
  data () {
    return {
      formInline: {
        name: '',
      },
      showDetail: false,
      columns: [
        { title: '供应商名称', key: 'name', width: 200 },
        { title: '联系人', key: 'contactPeople', width: 200 },
        { title: '联系方式', key: 'contactPhone', width: 200 },
        { title: '地址', key: 'address' },
        { title: '备注', key: 'mark' },
        {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 120,
            render: (h, params) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'text',
                            size: 'small'
                        },
                        on: {
                          click: () => {
                            this.onOpenDetail(params.id)
                          }
                        }
                    }, '查看'),
                    h('Button', {
                        props: {
                            type: 'text',
                            size: 'small'
                        },
                        on: {
                          click: () => {
                            this.onOpenEdit(params.id)
                          }
                        }
                    }, '编辑')
                ]);
            }
        }
      ]
    }
  },
  computed: {
    ...mapState('supplier', [
      'rows',
      'page',
      'count',
      'pageSize',
      'loading',
    ])
  },
  components: {
    SupplierDetail
  },
  methods: {
    ...mapActions('supplier', [
      'onSearch'
    ]),
    ...mapMutations('supplier', [
      'onUpdatePageSize'
    ]),
    onOpenDetail (id) {
      this.showDetail = true
      this.$store.commit('supplier/onOpenDetail', { type: 'detail', id })
    },
    onOpenEdit (id) {
      this.showDetail = true
      this.$store.commit('supplier/onOpenDetail', { type: 'edit', id })
    },
    onOpenAdd () {
      this.showDetail = true
      this.$store.commit('supplier/onOpenDetail', { type: 'add' })
    },
    onCloseDetail () {
      this.showDetail = false
    }
  },
  created () {
    this.onSearch(this.formInline.name)
  }
}
</script>

