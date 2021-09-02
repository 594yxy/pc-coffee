import {
  axios
} from '@/utils/request';
const deviceStatusList = [{
  name: '正常',
  value: '1'
}, {
  name: '异常',
  value: '0'
}, {
  name: '未知',
  value: '-1'
}]
const deviceTypeList = {
  1: '售货机',
  2: '咖啡机',
  3: '茶饮机',
  4: '智能柜',
  5: '合体机(咖啡机和综合机)',
  6: '固码机'
}
const deviceOrgList = {
  'yle': '以勒',
  'jko': '万事达',
}
const columns = [{
    title: '设备编号',
    dataIndex: 'deviceId'
  },
  {
    title: '绑定用户',
    dataIndex: 'userName'
  },
  {
    title: '设备类型',
    align: 'center',
    dataIndex: 'deviceType',
    customRender: (text, record, index) => `${deviceTypeList[text]}`
  },
  {
    title: '设备厂商',
    align: 'center',
    dataIndex: 'deviceOrg',
    customRender: (text, record, index) => `${deviceOrgList[text]}`
  },
  {
    title: '门店名称',
    dataIndex: 'storeName'
  },
  {
    title: '运营商编号',
    align: 'center',
    dataIndex: 'departmentId'
  },
  {
    title: '网络类型',
    align: 'center',
    dataIndex: 'netType'
  },
  {
    title: '设备状态',
    align: 'center',
    dataIndex: 'deviceStatus',
    scopedSlots: {
      customRender: 'deviceStatus'
    }
  },
  {
    title: '更新状态时间',
    align: 'center',
    dataIndex: 'gmtUpdate'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 90,
    align: 'center',
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
        listUrl: '/api/device/info/page',
        delUrl: '/api/device/info/delete/'
      },
      deviceStatusList,
      deviceOrgList
    }
  },
  created() {
    this.getList()
  },
  methods: {}
};
export default indexMixin;