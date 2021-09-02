import {
  axios
} from '@/utils/request';
const columns = [{
    title: '头像',
    dataIndex: 'userImage',
    scopedSlots: {
      customRender: 'userImage'
    }
  },
  {
    title: '昵称/手机号',
    dataIndex: 'user',
    scopedSlots: {
      customRender: 'user'
    }
  },
  {
    title: '充值金额',
    align: 'center',
    dataIndex: 'amount',
    scopedSlots: {
      customRender: 'amount'
    }
  },
  {
    title: '卡号',
    align: 'center',
    dataIndex: 'cardCode'
  },
  {
    title: '交易类型',
    align: 'center',
    dataIndex: 'tradeTypeDesc'
  },
  {
    title: '交易时间',
    align: 'center',
    dataIndex: 'tradeTime'
  }
]

const statusMap = {
  0: {
    status: 'close',
    text: '已关闭'
  },
  1: {
    status: 'default',
    text: '未结算'
  },
  2: {
    status: 'success',
    text: '已结算'
  },
  3: {
    status: 'error',
    text: '异常'
  }
}
var indexMixin = {
  data() {
    return {
      columns,
      Urls: {
        listUrl: '/api/user/card/trade/page'
      },
      valueStyle: {
        fontSize: '14px'
      },
      statusMap
    }
  },
  filters: {
    statusFilter(type) {
      return statusMap[type].text
    },
    statusTypeFilter(type) {
      return statusMap[type].status
    }
  },
  created() {
    this.getList()
  },
  methods: {
    add() {
      this.$dialog(
        TaskForm,
        // component props
        {
          record: {},
          on: {
            ok() {
              console.log('ok 回调')
            },
            cancel() {
              console.log('cancel 回调')
            },
            close() {
              console.log('modal close 回调')
            },
          },
        },
        // modal props
        {
          title: '新增',
          width: 700,
          centered: true,
          maskClosable: false,
        }
      )
    },
    edit(record) {
      console.log('record', record)
      this.$dialog(
        TaskForm,
        // component props
        {
          record,
          on: {
            ok() {
              console.log('ok 回调')
            },
            cancel() {
              console.log('cancel 回调')
            },
            close() {
              console.log('modal close 回调')
            },
          },
        },
        // modal props
        {
          title: '操作',
          width: 700,
          centered: true,
          maskClosable: false,
        }
      )
    },
  }
};
export default indexMixin;