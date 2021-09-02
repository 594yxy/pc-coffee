<template>
  <a-modal
    :title="textMap[dialogStatus]"
    :width="600"
    centered
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :maskClosable="false"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="用户名">
          <a-input placeholder="请输入用于登录的用户名" v-decorator="['username', validatorRules.username]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="昵称">
          <a-input placeholder="请输入您的昵称" v-decorator="['nickName', validatorRules.must]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="手机号码">
          <a-input :max-length="11" placeholder="请输入您的手机号码" v-decorator="['mobile', validatorRules.phone]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="微信号">
          <a-input placeholder="请输入您的微信Id号" v-decorator="['unionId']" />
        </a-form-item>
        <!-- <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="头像" style="margin-bottom: 12px">
          <a-upload
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :before-upload="beforeUpload"
            @change="handleChange"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" width="100%" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">点击上传</div>
            </div>
          </a-upload>
        </a-form-item> -->
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="备注" style="margin-bottom: 0">
          <a-textarea :rows="3" v-decorator="['remark']" placeholder="..." />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import modalMixin from '@/components/Mixins/modal'
import { axios } from '@/utils/request'
import pick from 'lodash.pick'
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  name: 'userModel',
  mixins: [modalMixin],
  data() {
    return {
      Urls: {
        addUrl: '/api/user/insert',
        editUrl: '/api/user/update/',
        getByIdUrl: '/api/user/get/',
        uploadFileUrl: '/api/file/upload',
      },
      textMap: {
        add: '新增用户',
        edit: '编辑用户',
      },
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
      validatorRules: {
        username: {
          rules: [
            { required: true, message: '请设置用户名，用于登录!' },
            { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' },
            {
              validator: (rule, value, callback) => {
                let pattern = /^[a-z|A-Z][a-z|A-Z\d_-]{0,}$/
                if (!pattern.test(value)) {
                  callback('用户名必须以字母开头，可包含数字、下划线、横杠')
                } else {
                  callback()
                }
              },
            },
          ],
        },
        must: {
          rules: [{ required: true, message: '此字段为必填!' }],
        },
        phone: {
          rules: [{ required: true, validator: this.validateMobile }],
        },
      },
      orgList: [],
      loading: false,
      imageUrl: '',
    }
  },
  created() {},
  methods: {
    beforeOpen() {},
    // 部门列表
    getOrgList() {
      axios({
        url: this.Urls.orgListurl,
        method: 'get',
      }).then((res) => {
        if (res.code == 0) {
          this.orgList = res.data.records
        } else {
          this.$notification.error({
            message: res.msg,
          })
        }
      })
    },
    setForm(data) {
      this.model.accountType = 'MICH'
      // this.imageUrl = data.image
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(data, 'username', 'nickName', 'mobile', 'unionId', 'remark'))
      })
    },
    handleChange(info) {
      let file = info.file
      console.log('file', file)
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('你只能上传图片格式为jpg或者png!')
        return false
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('图片大小不能超过2M!')
        return false
      }
      let formData = new FormData()
      formData.append('file', file)
      this.loading = true
      axios({
        url: this.Urls.uploadFileUrl,
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 0,
        data: formData,
      })
        .then((res) => {
          this.loading = false
          getBase64(file, (imageUrl) => {
            this.imageUrl = imageUrl
          })
          if (res.code == 0) {
            this.model.image = res.data.url
          } else {
            this.$notification.error({
              message: res.msg,
            })
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    beforeUpload() {
      return false
    },
  },
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