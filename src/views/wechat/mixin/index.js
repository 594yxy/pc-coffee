import {
  axios
} from '@/utils/request';
const columns = [{
    title: '用户名',
    dataIndex: 'userName'
  },
  {
    title: '手机号',
    align: 'center',
    dataIndex: 'mobile'
  },
  {
    title: '商品单号',
    dataIndex: 'orderCode'
  },
  {
    title: '订单数量',
    align: 'center',
    dataIndex: 'orderItemList',
    customRender: (text, record, index) => `${text?text.length:0}`
  },
  {
    title: '门店名称',
    dataIndex: 'storeName'
  },
  {
    title: '实际付款金额',
    align: 'center',
    dataIndex: 'actualPayAmount',
    scopedSlots: {
      customRender: 'actualPayAmount'
    }
  },
  {
    title: '取货码',
    align: 'center',
    dataIndex: 'pickUpGoodsNo'
  },
  {
    title: '创建时间',
    align: 'center',
    dataIndex: 'createTime'
  },
  {
    title: '操作',
    align: 'center',
    dataIndex: 'action',
    width: '100px',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
var indexMixin = {
  data() {
    return {
      columns,
      Urls: {
        listUrl: '/api/order/page',
        downloadExcelUrl: '/api/order/export/ids',
        deriveExcelUrl: '/api/order/export/condition',
      },
      valueStyle: {
        fontSize: '14px'
      }
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
  methods: {}
};
export default indexMixin;