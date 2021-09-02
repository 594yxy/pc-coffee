import {
  axios
} from '@/utils/request';
const withdrawalType = {
  'order': "订单分成",
  'charge': "充值分成",
  null: "未知"
}
const columns = [{
    title: '头像',
    dataIndex: 'distributorImage',
    scopedSlots: {
      customRender: 'distributorImage'
    }
  },
  {
    title: '昵称',
    align: 'center',
    dataIndex: 'distributorName'
  },
  {
    title: '手机号',
    align: 'center',
    dataIndex: 'distributorMobile'
  },
  {
    title: '提现金额',
    align: 'center',
    dataIndex: 'withdrawalAmount',
    scopedSlots: {
      customRender: 'withdrawalAmount'
    }
  },
  {
    title: '申请提现时间',
    align: 'center',
    dataIndex: 'createTime'
  },
  {
    title: '打款时间',
    align: 'center',
    dataIndex: 'completeTime'
  },
  {
    title: '打款方式',
    align: 'center',
    dataIndex: 'completeMethod'
  },
  {
    title: '提现类型',
    align: 'center',
    dataIndex: 'withdrawalType',
    customRender: (text, record, index) => `${withdrawalType[text]}`
  },
  {
    title: '状态',
    align: 'center',
    dataIndex: 'withdrawalStatusDesc'
  },
  {
    title: '操作',
    align: 'center',
    dataIndex: 'action',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
const statusMap = {
  0: {
    status: 'default',
    text: '未提现'
  },
  1: {
    status: 'success',
    text: '已提现'
  }
}
var indexMixin = {
  data() {
    return {
      Urls: {
        listUrl: '/api/withdrawal/page',
        editUrl: '/api/withdrawal/update/',
        downloadExcelUrl: '/api/withdrawal/export/ids',
        deriveExcelUrl: '/api/withdrawal/export/condition',
      },
      valueStyle: {
        fontSize: '14px'
      },
      columns
    }
  },
  filters: {
    statusFilter(type) {
      if (type == null) {
        return statusMap['0'].text
      }
      return statusMap[type].text
    },
    statusTypeFilter(type) {
      if (type == null) {
        return statusMap[0].status
      }
      return statusMap[type].status
    }
  },
  created() {
    this.getList()
  },

  methods: {
    handleFund(record, flag) {
      var _this = this
      _this.$confirm({
        title: `确定${flag=='PASS'?'同意':'拒绝'}${record.distributorName}的提现`,
        content: (<div><a-textarea ref="textarea" placeholder="意见" rows="4" /></div>),
        onOk() {
          if(!_this.$refs.textarea.stateValue && flag=="CANCEL"){
            _this.$message.error('请输入拒绝的原因');
            return true
          }
          axios({
            url: _this.Urls.editUrl + record.id,
            method: 'post',
            data: {
              withdrawalStatus: flag,
              auditComment: _this.$refs.textarea.stateValue
            }
          }).then(res => {
            if (res.code == 0) {
              _this.$notification.success({
                message: flag=='PASS'?'提现成功':'已拒绝'
              })
              _this.afterSubmit()
            } else {
              _this.$notification.error({
                message: res.msg
              })
            }
          })
        }
      })
    }
  }
};
export default indexMixin;