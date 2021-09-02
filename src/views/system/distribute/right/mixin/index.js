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
        self: {
          initialValue: '1',
          rules: [{
            required: true,
            message: '是否开启分销员自购分佣!'
          }]
        },
        tree: {
          initialValue: '1',
          rules: [{
            required: true,
            message: '是否开启分销员建立客户关系!'
          }]
        }
      },
      model: {
        formKeys: ['distributor_self', 'distributor_tree']
      }
    }
  },
  created() {
    this.getKeyValueList()
  },

  methods: {}
};
export default indexMixin;