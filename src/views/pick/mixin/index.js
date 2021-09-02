import {
  axios
} from '@/utils/request';
const columns = [{
    title: '商品名称',
    dataIndex: 'goodsName'
  },
  {
    title: '取货码',
    align: 'center',
    dataIndex: 'pickCode'
  },
  {
    title: '取货码状态',
    align: 'center',
    dataIndex: 'codeStatusDesc'
  },
  {
    title: '过期时间',
    align: 'center',
    dataIndex: 'expireTime'
  },
  {
    title: '销售时间',
    dataIndex: 'saleTime'
  },
  {
    title: '生成时间',
    align: 'center',
    dataIndex: 'createTime'
  }
]
var indexMixin = {
  data() {
    return {
      columns,
      Urls: {
        listUrl: '/api/pickcode/page',
        downloadExcelUrl: '/api/pickcode/export/ids',
        deriveExcelUrl: '/api/pickcode/export/condition'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {}
};
export default indexMixin;