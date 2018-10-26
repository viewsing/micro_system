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
      <Page style="margin-top: 1em;" @on-change="changePage" @on-page-size-change="changePageSize" :total="count" show-sizer :page-size="pageSize" :current="page" />
    </div>
    <SupplierDetail v-else />
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
            width: 165,
            render: (h, params) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'text',
                            size: 'small'
                        },
                        on: {
                          click: () => {
                            this.onOpenDetail(params.row.id)
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
                            this.onOpenEdit(params.row.id)
                          }
                        }
                    }, '编辑'),
                    h('Button', {
                      props: {
                        type: 'text',
                        size: 'small'
                      },
                      on: {
                        click: () => {
                          this.onDel(params.row.id)
                        }
                      }
                    }, '删除')
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
      'showDetail'
    ])
  },
  components: {
    SupplierDetail
  },
  methods: {
    ...mapActions('supplier', [
      'onSearch',
      'delSupplier',
      'changePageSize',
      'changePage'
    ]),
    ...mapMutations('supplier', [
      'updateOpenParams',
      'toggleShowDetail'
    ]),
    onOpenDetail (id) {
      this.toggleShowDetail(true)
      this.updateOpenParams({ type: 'detail', id })
    },
    onOpenEdit (id) {
      this.toggleShowDetail(true)
      this.updateOpenParams({ type: 'edit', id })
    },
    onOpenAdd () {
      this.toggleShowDetail(true)
      this.updateOpenParams({ type: 'add' })
    },
    onDel (id) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>确认删除该项？</p>',
        loading: true,
        onOk: async () => {
          const result = await this.delSupplier(id)
          if (result) {
            this.$Modal.remove()
          }
        }
      })
    }
  },
  created () {
    this.onSearch(this.formInline.name)
  }
}
</script>

