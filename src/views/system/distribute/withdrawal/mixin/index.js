import {
  axios
} from '@/utils/request';
import pick from 'lodash.pick'
var indexMixin = {
  data() {
    return {
      Urls: {
        getByIdUrl: '/api/setting/get/'
      },
      tips: {
        edit: '设置成功'
      },
      radioStyle: {
        display: 'block',
        height: '40px',
        lineHeight: '40px'
      },
      validatorRules: {
        withdrawal: {
          initialValue: '1',
          rules: [{
            required: true,
            message: '请选择提现设置!'
          }]
        },
        enableExp: {
          initialValue: '1',
          rules: [{
            required: true,
            message: '请选择提现时限设置!'
          }]
        },
        exp: {
          initialValue: 15,
          rules: [{
            required: true,
            message: '请输入提现间隔时限!'
          }]
        },
        method: {
          initialValue: '1',
          rules: [{
            required: true,
            message: '请选择提现打款方式!'
          }]
        }
      },
      isDisabled: false,
      model: {
        formKeys: ['enable_withdrawal', 'enable_withdrawal_exp', 'withdrawal_exp']
      }
    }
  },
  created() {
    this.getKeyValueList()
  },

  methods: {
    setForm() {
      if (this.model['enable_withdrawal_exp'] == '1') {
        this.isDisabled = false
      } else {
        this.isDisabled = true
      }
    },
    beforeSubmit(form) {
      if (form.distributor_join == 1) {
        form.distributor_join = form.distributor_join_money
      }
      delete form.distributor_join_money
      return form
    },
    radioChange(e) {
      let value = e.target.value
      console.log(value)
      if (value == 0) {
        this.isDisabled = true
      } else {
        this.isDisabled = false
      }
    }
  }
};
export default indexMixin;