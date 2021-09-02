import {
  axios
} from '@/utils/request';
import pick from 'lodash.pick'
var indexMixin = {
  data() {
    return {
      tips: {
        edit: '设置成功',
      },
      validatorRules: {
        method: {
          initialValue: '1',
          rules: [{
            required: true,
            message: '是否开启结算方式!'
          }]
        },
        pay: {
          rules: [{
            required: true,
            message: '请输入微信支付商户号!'
          }, {
            min: 10,
            max: 30,
            message: '长度在 10 到 30 个字符',
            trigger: 'blur'
          }]
        }
      },
      model: {
        formKeys: ['settlement_method', 'pay_parnter_id']
      },
      isShow: false
    }
  },
  created() {
    this.getKeyValueList()
  },

  methods: {
    setForm() {
      if (this.model.pay_parnter_id) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    }
  }
};
export default indexMixin;