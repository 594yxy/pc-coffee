<template>
  <a-modal
    :title="textMap[dialogStatus]"
    :width="600"
    centered
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    :maskClosable="false"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="设备厂商">
          <a-radio-group
            v-decorator="['deviceOrg', { initialValue: 'yle', rules: [{ required: true, message: '请选择设备厂商' }] }]"
          >
            <a-radio value="yle">以勒</a-radio>
            <a-radio value="jko">万事达</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="设备编号">
          <a-input
            :disabled="isDisabled"
            placeholder="请输入设备号"
            v-decorator="['deviceId', validatorRules.deviceId]"
          >
            <a-tooltip slot="addonAfter" title="获取设备信息" v-if="!isDisabled">
              <a-icon
                type="control"
                @click.prevent="checkDevice"
                style="font-size: 18px; vertical-align: text-bottom"
              />
            </a-tooltip>
          </a-input>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="分配用户">
          <a-select
            mode="multiple"
            v-decorator="['userId', { rules: [{ required: true, message: '请选择与这台设备绑定的用户' }] }]"
            placeholder="请选择，可多选"
          >
            <a-select-option v-for="item in userList" :key="item.id" :value="item.id">
              {{ item.nickName }}</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="门店名称">
          <a-input
            placeholder="请输入门店名称"
            :max-length="36"
            v-decorator="['storeName', { rules: [{ required: true, message: '请填写所在门店的名称' }] }]"
          />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="设备状态">
          <a-select disabled v-decorator="['deviceStatus']" placeholder="请选择">
            <a-select-option v-for="item in deviceStatusList" :key="item.value" :value="item.value">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="运营号编号">
          <a-input disabled placeholder="请输入运营号编号" v-decorator="['departmentId']" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="设备地址">
          <a-input disabled placeholder="请输入设备地址" v-decorator="['deviceAddress']" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import modalMixin from '@/components/Mixins/modal'
import { axios } from '@/utils/request'
import pick from 'lodash.pick'
export default {
  name: 'deviceModel',
  mixins: [modalMixin],
  data() {
    const deviceStatusList = [
      {
        name: '正常',
        value: '1'
      },
      {
        name: '异常',
        value: '0'
      },
      {
        name: '未知',
        value: '-1'
      }
    ]
    return {
      Urls: {
        addUrl: '/api/device/info/insert',
        editUrl: '/api/device/info/update/',
        userListUrl: '/api/user/query',
        checkDeviceUrl: '/api/device/info/check/'
      },
      textMap: {
        add: '新增设备',
        edit: '编辑设备'
      },
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      },
      validatorRules: {
        deviceId: {
          rules: [{ required: true, message: '请输入设备编号' }]
        },
        must: {
          rules: [{ required: true, message: '此字段为必填!' }]
        }
      },
      userList: [],
      isAdd: false,
      deviceStatusList
    }
  },
  created() {},
  methods: {
    beforeOpen() {
      this.getUserList()
    },
    // 用户列表
    getUserList() {
      axios({
        url: this.Urls.userListUrl,
        method: 'post',
        data: { accountType: 'MICH' }
      }).then(res => {
        if (res.code == 0) {
          this.userList = res.data.records
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      })
    },
    checkDevice() {
      let id = this.form.getFieldValue('deviceId')
      if (!id) {
        return
      }
      axios({
        url: this.Urls.checkDeviceUrl + id,
        method: 'get',
        params: {
          org: this.form.getFieldValue('deviceOrg')
        }
      }).then(res => {
        if (res.code == 0) {
          this.isAdd = true
          this.$nextTick(() => {
            this.form.setFieldsValue(pick(res.data, 'deviceStatus', 'departmentId', 'deviceAddress'))
          })
        } else {
          this.isAdd = false
          this.$message.error(res.msg || '没有找到对应设备')
        }
      })
    },
    handleOk(e) {
      if (this.isAdd) {
        this.handleSubmit(e)
      } else {
        this.$message.error('请输入正确的设备编号查找设备信息')
      }
    },
    beforeSubmit(form) {
      form.userId = form.userId.join()
      return form
    },
    setForm(data) {
      if (data.id) {
        data.userId = data.userId ? data.userId.split(',') : []
        this.isAdd = true
      }
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(data, 'deviceOrg', 'deviceId', 'userId', 'storeName', 'deviceStatus', 'departmentId', 'deviceAddress')
        )
      })
    }
  }
}
</script>

<style>
.avatar-uploader > .ant-upload {
  width: 120px;
  height: 120px;
  margin: 0;
}
.ant-upload-select-picture-card i {
  font-size: 22px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 3px;
  color: #666;
}
</style>
