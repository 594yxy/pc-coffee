import {
  axios
} from '@/utils/request';
const columns = [{
    title: '头像',
    dataIndex: 'image',
    scopedSlots: {
      customRender: 'image'
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
    title: '用户名',
    align: 'center',
    dataIndex: 'username'
  },
  {
    title: '等级',
    align: 'center',
    dataIndex: 'levelName'
  },
  {
    title: '可提现余额',
    align: 'center',
    dataIndex: 'balance',
    scopedSlots: {
      customRender: 'balance'
    }
  },
  {
    title: '累计收益',
    align: 'center',
    dataIndex: 'allAmount',
    scopedSlots: {
      customRender: 'allAmount'
    }
  },
  {
    title: '累计客户',
    align: 'center',
    dataIndex: 'cusCount'
  },
  {
    title: '加入时间',
    align: 'center',
    dataIndex: 'createTime'
  },
  {
    title: '审核状态',
    align: 'center',
    dataIndex: 'auditStatus',
    scopedSlots: {
      customRender: 'auditStatus'
    }
  },
  {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    align: 'center',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
const statusMap = {
  'WAIT': {
    status: 'warning',
    text: '未达标'
  },
  'AUDIT': {
    status: 'default',
    text: '待审核'
  },
  'REJECT': {
    status: 'error',
    text: '已拒绝'
  },
  'PASS': {
    status: 'success',
    text: '已通过'
  }
}

var indexMixin = {
  data() {
    return {
      Urls: {
        listUrl: '/api/user/page',
        editUrl: '/api/user/update/',
        delUrl: '/api/user/delete/',
      },
      columns,
      statusMap,
      valueStyle: {
        fontSize: '14px'
      },
      pagination: {
        pageSize: 1000
      },
      baseParam: {
        accountType: 'OUTSIDE'
      }
    }
  },
  filters: {
    statusFilter(type) {
      if (!type) {
        return ''
      }
      return statusMap[type].text
    },
    statusTypeFilter(type) {
      if (!type) {
        return ''
      }
      return statusMap[type].status
    }
  },
  created() {
    this.getList();
  },

  methods: {}
};
export default indexMixin;