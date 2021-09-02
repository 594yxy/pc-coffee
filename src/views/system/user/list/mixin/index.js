import {
  axios
} from '@/utils/request';
const columns = [{
    title: '昵称',
    dataIndex: 'nickName'
  },
  {
    title: '用户名',
    dataIndex: 'username'
  },
  {
    title: '手机号',
    align: 'center',
    dataIndex: 'mobile'
  },
  {
    title: '备注',
    dataIndex: 'remark'
  },
  {
    title: '创建时间',
    align: 'center',
    dataIndex: 'createTime'
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

var indexMixin = {
  data() {
    return {
      Urls: {
        listUrl: '/api/user/page',
        editUrl: '/api/user/update/',
        delUrl: '/api/user/delete/',
      },
      columns,
      valueStyle: {
        fontSize: '14px'
      },
      baseParam: {
        accountType: 'MICH'
      }
    }
  },
  created() {
    this.getList();
  },
  methods: {}
};
export default indexMixin;