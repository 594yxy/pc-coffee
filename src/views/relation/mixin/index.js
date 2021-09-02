import {
  axios
} from '@/utils/request';

const relation = {
  0: "有效",
  1: "保护期",
  2: "失效",
  3: "未生效",
  null: "未知"
}

const columns = [{
    title: '买家头像',
    dataIndex: 'userImage',
    scopedSlots: {
      customRender: 'userImage'
    }
  },
  {
    title: '买家昵称',
    align: 'center',
    dataIndex: 'userName'
  },
  {
    title: '分销员手机号',
    align: 'center',
    dataIndex: 'parentMobile'
  },
  {
    title: '关系绑定时间',
    align: 'center',
    dataIndex: 'createTime'
  },
  {
    title: '关系有效时间',
    align: 'center',
    dataIndex: 'expTime'
  },
  {
    title: '关系保护时间',
    align: 'center',
    dataIndex: 'proTime'
  },
  {
    title: '当前关系',
    align: 'center',
    dataIndex: 'relation',
    customRender: (text, record, index) => `${relation[text]}`
  },
  {
    title: '失效原因',
    dataIndex: 'reason',
    ellipsis: true
  }
]

var indexMixin = {
  data() {
    return {
      Urls: {
        listUrl: '/api/relation/history/page',
        delUrl: '/api/relation/history/delete/',
      },
      columns,
      relation
    }
  },
  filters: {},
  created() {
    this.getList();
  },

  methods: {}
};
export default indexMixin;