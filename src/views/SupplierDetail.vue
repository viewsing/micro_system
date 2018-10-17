<template>
  <div class="supplier-detail">
    <h2 style="text-align: center;">{{title}}</h2>
    <Row style="margin-top: 2em;">

        <Col span="10">
          <h3>基础资料</h3>
          <Form :model="formItem" :rules="ruleValidate" style="margin-top: 1em;" :label-width="80">
            <FormItem label="供应商名称" prop="name" >
                <Input v-model="formItem.name" placeholder="供应商名称" :readonly="readonly"></Input>
            </FormItem>
            <FormItem label="联系人" prop="contactPeople">
                <Input v-model="formItem.contactPeople" placeholder="联系人" :readonly="readonly"></Input>
            </FormItem>
            <FormItem label="联系方式" prop="contactPhone">
                <Input v-model="formItem.contactPhone" placeholder="联系方式" :readonly="readonly"></Input>
            </FormItem>
            <FormItem label="地址" prop="address">
                <Input v-model="formItem.address" placeholder="地址" :readonly="readonly"></Input>
            </FormItem>
            <FormItem label="备注">
                <Input v-model="formItem.mark" type="textarea" placeholder="备注" :readonly="readonly"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary">确定</Button>
                <Button style="margin-left: 8px" @click="cancel">取消</Button>
            </FormItem>
          </Form>
        </Col>

        <Col span="10" offset="2">
          <h3>财务信息</h3>
          <Form :model="formItem" :rules="ruleValidate" style="margin-top: 1em;" :label-width="80">
            <FormItem label="开户名称">
                <Input v-model="formItem.accountName" placeholder="开户名称" :readonly="readonly"></Input>
            </FormItem>
            <FormItem label="开户银行">
                <Input v-model="formItem.accountBank" placeholder="开户银行" :readonly="readonly"></Input>
            </FormItem>
            <FormItem label="开户账号">
                <Input v-model="formItem.accountNo" placeholder="开户账号" :readonly="readonly"></Input>
            </FormItem>
          </Form>
        </Col>
    </Row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      formItem: {
        name: '',
        contactPeople: '',
        contactPhone: '',
        address: '',
        mark: '',
        accountName: '',
        accountNo: '',
        accountBank: ''
      },
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
  computed: {
    ...mapState('supplier', {
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
      id: state => state.openParams.id
    })
  },
  methods: {
    cancel () {
      this.$emit('close-detail')
    }
  }
}
</script>
