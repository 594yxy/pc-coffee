import {
  axios
} from '@/utils/request';
const columns = [{
    title: '订单号',
    align: 'left',
    dataIndex: 'orderCode',
  }, {
    title: '头像',
    align: 'left',
    dataIndex: 'distributorImage',
    scopedSlots: {
      customRender: 'distributorImage'
    }
  },
  {
    title: '昵称/手机号',
    dataIndex: 'distributor',
    scopedSlots: {
      customRender: 'distributor'
    }
  },
  {
    title: '订单金额',
    align: 'center',
    dataIndex: 'originalAmount',
    scopedSlots: {
      customRender: 'originalAmount'
    }
  },
  {
    title: '优惠金额',
    align: 'center',
    dataIndex: 'discountAmount',
    scopedSlots: {
      customRender: 'discountAmount'
    }
  },
  {
    title: '分销奖励',
    align: 'center',
    dataIndex: 'distributorAmount',
    scopedSlots: {
      customRender: 'distributorAmount'
    }
  },
  {
    title: '实付金额',
    align: 'center',
    dataIndex: 'actualPayAmount',
    scopedSlots: {
      customRender: 'actualPayAmount'
    }
  },
  {
    title: '订单类型',
    align: 'center',
    dataIndex: 'orderType'
  },
  {
    title: '交易时间',
    align: 'center',
    dataIndex: 'createTime'
  },
  {
    title: '结算状态',
    align: 'center',
    dataIndex: 'distributorStatus'
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
        listUrl: '/api/distributor/order/page',
        downloadExcelUrl: '/api/distributor/order/export/ids'
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