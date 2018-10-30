<template>
  <div class="supplier-detail">
    <h2 style="text-align: center;">{{title}}</h2>
    <Row style="margin-top: 2em;">
        <Spin size="large" fix v-if="loading"></Spin>
        <Col span="10">
          <h3>基础资料</h3>
          <Form :model="formItem" :rules="ruleValidate" style="margin-top: 1em;" :label-width="80">
            <FormItem label="供应商名称" prop="name" >
                <Input :value="formItem.name" name="name" placeholder="供应商名称" @on-change="updateFormItem" :readonly="readonly"></Input>
            </FormItem>
            <FormItem label="联系人" prop="contactPeople">
                <Input :value="formItem.contactPeople" name="contactPeople" placeholder="联系人" @on-change="updateFormItem" :readonly="readonly"></Input>
            </FormItem>
            <FormItem label="联系方式" prop="contactPhone">
                <Input :value="formItem.contactPhone" name="contactPhone" placeholder="联系方式" @on-change="updateFormItem" :readonly="readonly"></Input>
            </FormItem>
            <FormItem label="地址" prop="address">
                <Input :value="formItem.address" name="address" placeholder="地址" @on-change="updateFormItem" :readonly="readonly"></Input>
            </FormItem>
            <FormItem label="备注">
                <Input :value="formItem.mark" name="mark" type="textarea" placeholder="备注" @on-change="updateFormItem" :readonly="readonly"></Input>
            </FormItem>
            <FormItem>
                <Button v-if="type!=='detail'" type="primary" @click="confirm">确定</Button>
                <Button style="margin-left: 8px" @click="cancel">取消</Button>
            </FormItem>
          </Form>
        </Col>

        <Col span="10" offset="2">
          <h3>财务信息</h3>
          <Form :model="formItem" :rules="ruleValidate" style="margin-top: 1em;" :label-width="80">
            <FormItem label="开户名称">
                <Input :value="formItem.accountName" name="accountName" placeholder="开户名称" @on-change="updateFormItem" :readonly="readonly"></Input>
            </FormItem>
            <FormItem label="开户银行">
                <Input :value="formItem.accountBank" name="accountBank" placeholder="开户银行" @on-change="updateFormItem" :readonly="readonly"></Input>
            </FormItem>
            <FormItem label="开户账号">
                <Input :value="formItem.accountNo" name="accountNo" placeholder="开户账号" @on-change="updateFormItem" :readonly="readonly"></Input>
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
            { required: true, message: '供应商名称必填', trigger: 'blur' }
        ],
        contactPeople: [
            { required: true, message: '联系人必填', trigger: 'blur' },
        ],
        contactPhone: [
            { required: true, message: '联系电话必填', trigger: 'blur' },
        ],
        address: [
            { required: true, message: '联系地址必填', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    ...mapMutations('suppliers', ['updateFormItem', 'updateDetail', 'toggleShowDetail']),
    ...mapActions('suppliers', ['getSupplierById', 'putSupplier', 'postSupplier']),
    cancel () {
      this.toggleShowDetail(false)
    },
    confirm () {
      if (this.type === 'add') {
        this.putSupplier()
      } else if (this.type === 'edit') {
        this.postSupplier()
      }
    }
  },
  computed: {
    ...mapState('suppliers', {
      title: state => {
        const openParams = state.openParams
        if (openParams.type === 'add') {
          return '新增供应商'
        } else if (openParams.type === 'edit') {
          return '编辑供应商'
        } else {
          return '供应商详情'
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
        name: '', contactPeople: '', contactPhone: '', address: '', mark: '', accountName: '', accountBank: '', accountNo: ''
      })
    //否则要请求接口获取数据
    } else {
      this.getSupplierById({ id: this.id })
    }
  }
}
</script>
