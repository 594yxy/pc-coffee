import {
  axios
} from '@/utils/request';
import pick from 'lodash.pick'
var indexMixin = {
  data() {
    const columns = [{
        title: '等级名',
        dataIndex: 'levelName',
        scopedSlots: {
          customRender: 'levelName'
        },
        width: 180
      },
      {
        title: '升级规则',
        dataIndex: 'levelCondition',
        scopedSlots: {
          customRender: 'levelCondition'
        },
        width: 300
      },
      {
        title: '等级权益',
        dataIndex: 'levelCommission',
        align: 'center',
        scopedSlots: {
          customRender: 'levelCommission'
        },
        width: 250
      },
      {
        title: '排序',
        dataIndex: 'order',
        align: 'center',
        scopedSlots: {
          customRender: 'order'
        }
      },
      {
        title: '操作',
        dataIndex: 'action',
        align: 'center',
        width: '150px',
        scopedSlots: {
          customRender: 'action'
        }
      }
    ];
    const levelCondition = {
      'c': {
        key: 'levelCCharge',
        value: '累计充值',
        unit: '元'
      },
      'o': {
        key: 'levelCOrder',
        value: '累计消费',
        unit: '元'
      },
      'i': {
        key: 'levelCInvite',
        value: '累计邀请',
        unit: '个'
      },
      'g': {
        key: 'levelCGoods',
        value: '特定商品',
        unit: '个'
      },
    }
    return {
      Urls: {
        listUrl: '/api/user/level/list',
        editUrl: '/api/user/level/update/',
        addUrl: '/api/user/level/insert',
        delUrl: '/api/user/level/delete/'
      },
      columns: columns,
      dataSource: [],
      validatorRules: {
        level: {
          initialValue: '1',
          rules: [{
            required: true,
            message: '是否开启分销层级!'
          }]
        }
      },
      model: {
        formKeys: ['enable_level_up']
      },
      levelCondition
    }
  },
  created() {
    this.getData();
    this.getKeyValueList();
  },

  methods: {
    handleAdd() {
      this.dataSource.push({
        levelName: '',
        levelCondition: undefined,
        levelCommission: 0,
        levelAmount: 0,
        editable: true
      })
    },
    handleEdit(record, key) {
      const newData = [...this.dataSource];
      const target = newData.filter((item, index) => key === index)[0];
      this.editingKey = key;
      if (target) {
        console.log(target)
        target.editable = true;
        this.dataSource = newData;
      }
    },
    handleChange(value, key, column) {
      console.log(value, key, column)
      const newData = [...this.dataSource];
      const target = newData.filter((item, index) => key === index)[0];
      if (target) {
        target[column] = value;
        this.dataSource = newData;
      }
    },
    handleSave(record, key) {
      const newData = [...this.dataSource];
      const target = newData.filter((item, index) => key === index)[0];
      axios({
        url: target.id ? (this.Urls.editUrl + target.id) : this.Urls.addUrl,
        method: 'post',
        data: target
      }).then(res => {
        if (res.code == 0) {
          if (target) {
            delete target.editable;
          }
          this.$notification.success({
            message: this.model.id ? this.tips.edit : this.tips.add
          })
          this.getData();
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      }).catch(() => {
        this.localLoading = false
      })
    },
    handleCancel(record, key) {
      const newData = [...this.dataSource];
      const target = newData.filter((item, index) => key === index)[0];
      if (target && target.id) {
        delete target.editable;
        this.dataSource = newData;
      } else {
        this.dataSource.splice(key, 1);
      }
    },
    handleDel(record, key) {
      const newData = [...this.dataSource];
      const target = newData.filter((item, index) => key === index)[0];
      if (target && target.id) {
        delete target.editable;
        var _this = this
        _this.$confirm({
          title: '确定要删除该条数据么？',
          content: '删除不可恢复',
          centered: true,
          okType: 'danger',
          onOk() {
            axios({
              url: _this.Urls.delUrl + target.id,
              method: 'get'
            }).then(res => {
              if (res.code == 0) {
                _this.$notification.success({
                  message: '删除成功'
                })
                _this.getData()
              } else {
                _this.$notification.error({
                  message: res.msg
                })
              }
            })
          }
        })
      } else {
        this.dataSource.splice(key, 1);
      }
    }
  }
};
export default indexMixin;