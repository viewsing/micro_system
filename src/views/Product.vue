<template>
    <div class="product">
        <div v-if="!showDetail" class="product-list">
            <div class="header" style="position: relative;">
                <Form ref="formInline" :model="formInline" inline @submit.native.prevent >
                    <FormItem prop="name">
                        <Input v-model="formInline.name" placeholder="产品名称" />
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
        <ProductDetail v-else />
    </div>
</template>

<script>
  import { mapState, mapActions, mapMutations } from 'vuex'
  import ProductDetail from './ProductDetail.vue'
  export default {
    data () {
      return {
        formInline: {
          name: '',
        },
        columns: [
          {
            title: '商品图片',
            key: 'picture',
            width: 200,
            render: (h, params) => {
              return h('img', {
                domProps: {
                  src: params.row.picture[0].url,
                  alt: '图片',
                  width: 80,
                  height: 80,
                },
                style: {
                  padding: '10px',
                }
              })
            }
          },
          { title: '商品编号', key: 'code', width: 200 },
          { title: '商品名称', key: 'name', width: 200 },
          { title: '商品类别', key: 'type' },
          { title: '单位', key: 'unit' },
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
      ...mapState('products', [
        'rows',
        'page',
        'count',
        'pageSize',
        'loading',
        'showDetail'
      ])
    },
    components: {
      ProductDetail
    },
    methods: {
      ...mapActions('products', [
        'onSearch',
        'delRow',
        'changePageSize',
        'changePage'
      ]),
      ...mapMutations('products', [
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
            const result = await this.delRow(id)
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