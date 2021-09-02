import {
  axios
} from '@/utils/request';
const backMoneyStatusList = [{
  name: '退款成功',
  value: 1
}, {
  name: '退款失败',
  value: 0
}, {
  name: '未知',
  value: -1
}]
const payWayList = {
  0: '免费',
  1: '现金',
  2: '支付宝',
  3: '微信',
  4: '银联',
  5: '刷卡',
  6: '积分',
  8: '支付宝刷脸',
  9: '收钱吧支付',
  31: '取货码'
}
const orderStatusList = {
  'SUCCESS': '成功',
  'FAILED': '失败',
}
const deviceTypeList = {
  1: '售货机',
  2: '咖啡机',
  3: '茶饮机',
  4: '智能柜',
  5: '合体机(咖啡机和综合机)',
  6: '固码机',
}
const columns = [{
    title: '订单号',
    dataIndex: 'orderId'
  },
  {
    title: '门店名称',
    dataIndex: 'storeName'
  },
  {
    title: '设备编号',
    align: 'center',
    dataIndex: 'deviceId'
  },
  {
    title: '设备类型',
    align: 'center',
    dataIndex: 'deviceType',
    customRender: (text, record, index) => `${deviceTypeList[text]}`
  },
  {
    title: '商品名称',
    dataIndex: 'goodsName'
  },
  {
    title: '商品价格',
    dataIndex: 'goodsPrice',
    scopedSlots: {
      customRender: 'goodsPrice'
    }
  },
  {
    title: '支付方式',
    align: 'center',
    dataIndex: 'payWay',
    customRender: (text, record, index) => `${payWayList[text] || ""}`
  },
  {
    title: '收款帐号',
    dataIndex: 'payAppId',
    ellipsis: true,
    customRender: (text, record, index) => `${(text=="null" || !text)?"无":text}`
  },
  {
    title: '下单时间',
    align: 'center',
    dataIndex: 'gmtCreate'
  },
  {
    title: '操作',
    align: 'center',
    fixed: 'right',
    dataIndex: 'action',
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
        listUrl: '/api/device/order/page',
        downloadExcelUrl: '/api/device/order/export/ids',
        deriveExcelUrl: '/api/device/order/export/condition',
        pullDataUrl: '/api/mach/recall/pull'
      },
      backMoneyStatusList,
      deviceTypeList,
      payWayList,
      orderStatusList,
      valueStyle: {
        fontSize: '14px'
      },
      payTree: [],
      queryParam: {
        condition: {},
        orderBy: [{
          desc: true,
          orderBy: 'gmtCreate'
        }]
      },
      pullDate: null
    }
  },
  created() {
    this.getList()
    let keys = Object.keys(this.payWayList)
    for (let i = 0; i < keys.length; i++) {
      this.payTree[i] = {
        title: this.payWayList[keys[i]],
        key: keys[i],
        value: keys[i],
        children: null
      }
    }
  },
  methods: {
    // 补录数据
    handlePull() {
      let _this = this
      if (!_this.pullDate) {
        this.$message.error('请选择需补录数据的日期范围!');
        return
      }
      _this.$confirm({
        title: '提示',
        content: `确认补录（${_this.pullDate[0]}至${_this.pullDate[1]}）时间段内的数据？`,
        onOk() {
          _this.localLoading = true
          axios({
            url: _this.Urls.pullDataUrl,
            method: 'get',
            params: {
              start: _this.pullDate[0] + ' 00:00:00',
              end: _this.pullDate[1] + ' 23:59:59',
            },
          }).then((res) => {
            _this.localLoading = false
            if (res.code == 0) {} else {
              _this.$notification.error({
                message: res.msg,
              })
            }
          }).catch(() => {
            _this.localLoading = false
          })
        },
        onCancel() {}
      });
    },
    dateChange(date, dateString) {
      console.log(dateString)
      this.pullDate = dateString
    },
  }
};
export default indexMixin;