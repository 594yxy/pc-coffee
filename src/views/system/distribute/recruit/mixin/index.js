import {
  axios
} from '@/utils/request';
import pick from 'lodash.pick'
var indexMixin = {
  data() {
    return {
      tips: {
        edit: '设置成功'
      },
      labelCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 4
        }
      },
      wrapperCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 20
        }
      },
      validatorRules: {
        invite: {
          initialValue: '1',
          rules: [{
            required: true,
            message: '是否开启分销员招募!'
          }]
        },
        audit: {
          initialValue: '1',
          rules: [{
            required: true,
            message: '请选择分销员审核方式!'
          }]
        },
        reward: {
          initialValue: '1',
          rules: [{
            required: true,
            message: '是否开启邀请奖励!'
          }]
        }
      },
      model: {
        formKeys: ['distributor_invite', 'distributor_audit', 'invite_reward']
      }
    }
  },
  created() {
    this.getKeyValueList()
  },

  methods: {}
};
export default indexMixin;