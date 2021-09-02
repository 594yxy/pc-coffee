import {
  axios
} from '@/utils/request';
const columns = [{
    title: '头像',
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
    title: '累计订单金额',
    align: 'center',
    dataIndex: 'orderAllAmount',
    scopedSlots: {
      customRender: 'orderAllAmount'
    },
    sorter: true
  },
  {
    title: '累计收益',
    align: 'center',
    dataIndex: 'allAmount',
    scopedSlots: {
      customRender: 'allAmount'
    },
    sorter: true
  },
  {
    title: '商品佣金',
    align: 'center',
    dataIndex: 'orderAmount',
    scopedSlots: {
      customRender: 'orderAmount'
    },
    sorter: true
  },
  {
    title: '邀请奖励',
    align: 'center',
    dataIndex: 'inviteAmount',
    scopedSlots: {
      customRender: 'inviteAmount'
    },
    sorter: true
  },
  {
    title: '累计订单',
    align: 'center',
    dataIndex: 'allCount',
    sorter: true
  },
  {
    title: '商品订单',
    align: 'center',
    dataIndex: 'orderCount'
  },
  {
    title: '邀请订单',
    align: 'center',
    dataIndex: 'inviteCount'
  },
  {
    title: '累计客户',
    align: 'center',
    dataIndex: 'cusCount',
    sorter: true
  },
  {
    title: '导出状态',
    align: 'center',
    dataIndex: 'exportFlag',
    scopedSlots: {
      customRender: 'exportFlag'
    }
  }
]
var indexMixin = {
  data() {
    return {
      Urls: {
        listUrl: '/api/achievement/page',
        downloadExcelUrl: '/api/achievement/export/ids',
        deriveExcelUrl: '/api/achievement/export/condition',
      },
      columns,
      valueStyle: {
        fontSize: '14px'
      }
    }
  },
  created() {
    this.getList()
  },

  methods: {}
};
export default indexMixin;