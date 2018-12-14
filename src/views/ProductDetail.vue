<template>
    <div class="product-detail">
        <h2 style="text-align: center;">{{title}}</h2>
        <Row style="margin-top: 2em;">
            <Spin size="large" fix v-if="loading"></Spin>
            <Col span="10">
                <h3>基础资料</h3>
                <Form :model="formItem" :rules="ruleValidate" style="margin-top: 1em;" :label-width="80">
                    <FormItem label="产品编号" prop="code" >
                        <Input :value="formItem.code" name="code" placeholder="产品编号" @on-change="updateFormItem" :readonly="readonly"></Input>
                    </FormItem>
                    <FormItem label="产品名称" prop="name">
                        <Input :value="formItem.name" name="name" placeholder="产品名称" @on-change="updateFormItem" :readonly="readonly"></Input>
                    </FormItem>
                    <FormItem label="产品类别" prop="type">
                        <Input :value="formItem.type" name="type" placeholder="产品类别" @on-change="updateFormItem" :readonly="readonly"></Input>
                    </FormItem>
                    <FormItem label="产品单位" prop="unit">
                        <Input :value="formItem.unit" name="unit" placeholder="产品单位" @on-change="updateFormItem" :readonly="readonly"></Input>
                    </FormItem>
                    <FormItem label="产品图片">
                        <Upload
                            name="picture"
                            action="http://localhost:3111/api/upload"
                            with-credentials
                            :default-file-list="formItem.picture"
                            :on-success="updatePicture"
                        >
                            <Button icon="ios-cloud-upload-outline">上传图片</Button>
                        </Upload>
                    </FormItem>
                    <FormItem>
                        <Button v-if="type!=='detail'" type="primary" @click="confirm">确定</Button>
                        <Button style="margin-left: 8px" @click="cancel">取消</Button>
                    </FormItem>
                </Form>
            </Col>
        </Row>
    </div>
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex'

  export default {
    data () {
      return {
        ruleValidate: {
          name: [
            { required: true, message: '产品名称', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '产品类型', trigger: 'blur' },
          ],
          unit: [
            { required: true, message: '产品单位', trigger: 'blur' },
          ],
        }
      }
    },
    methods: {
      ...mapMutations('products', ['updateFormItem', 'updateDetail', 'toggleShowDetail']),
      ...mapActions('products', ['getRowById', 'putRow', 'postRow']),
      cancel () {
        this.toggleShowDetail(false)
      },
      confirm () {
        if (this.type === 'add') {
          this.putRow()
        } else if (this.type === 'edit') {
          this.postRow()
        }
      },
      //更新图片详情
      updatePicture (res, file) {
        file.url = res.data
        this.updateFormItem({
          target: {
            name: 'picture',
            value: [ { name: file.name, url: res.data }]
          }
        })
      },
    },
    computed: {
      ...mapState('products', {
        title: state => {
          const openParams = state.openParams
          if (openParams.type === 'add') {
            return '新增产品'
          } else if (openParams.type === 'edit') {
            return '编辑产品'
          } else {
            return '产品详情'
          }
        },
        readonly: state => state.openParams.type === 'detail',
        type: state => state.openParams.type,
        id: state => state.openParams.id,
        formItem: state => state.formItem,
        loading: state => state.loading
      }),
    },
    created () {
      //如果是新增，则表单详情每个字段要设置为空
      if (this.type === 'add') {
        this.updateDetail({
          code: '', name: '', type: '', unit: '', picture: []
        })
        //否则要请求接口获取数据
      } else {
        this.getRowById(this.id)
      }
    }
  }
</script>
