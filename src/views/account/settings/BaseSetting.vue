<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="18" :xxl="10">
        <a-spin :spinning="confirmLoading">
          <a-form :form="form" layout="vertical" @submit="handleSubmit">
            <a-form-item label="用户名">
              <a-input read-only v-decorator="['username']" placeholder="用户名" />
            </a-form-item>
            <a-form-item label="手机号">
              <a-input read-only v-decorator="['mobile']" placeholder="手机号" />
            </a-form-item>
            <a-form-item label="旧密码" :required="false">
              <a-input-password
                placeholder="请输入您的旧密码"
                v-decorator="['oldPwd', { rules: [{ required: true, message: '请输入您的旧密码' }] }]"
              >
                <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
              </a-input-password>
            </a-form-item>
            <a-form-item label="新密码" :required="false">
              <a-input-password
                placeholder="请输入您的新密码"
                v-decorator="[
                  'newPwd',
                  {
                    rules: [
                      { required: true, message: '请输入您的新密码' },
                      { min: 6, message: '密码不能小于6个字符' },
                      { validator: validateToNextPassword },
                    ],
                  },
                ]"
              >
                <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
              </a-input-password>
            </a-form-item>
            <a-form-item label="确认新密码" :required="false">
              <a-input-password
                placeholder="请再次输入您的新密码"
                v-decorator="[
                  'newPwdConfirm',
                  {
                    rules: [
                      { required: true, message: '请再次输入您的新密码' },
                      { min: 6, message: '密码不能小于6个字符' },
                      { validator: compareToFirstPassword },
                    ],
                  },
                ]"
              >
                <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
              </a-input-password>
            </a-form-item>
            <a-form-item>
              <a-button style="margin-right: 12px" @click="resetForm"> 重置 </a-button>
              <a-button type="primary" html-type="submit"> 确认提交 </a-button>
            </a-form-item>
          </a-form>
        </a-spin>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import pick from 'lodash.pick'
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { axios } from '@/utils/request'

export default {
  data() {
    return {
      // cropper
      preview: {},
      option: {
        img: '/avatar2.jpg',
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1],
        confirmLoading: false,
      },
      form: this.$form.createForm(this),
    }
  },
  created() {
    this.fillForm()
  },
  methods: {
    fillForm() {
      this.confirmLoading = true
      axios({
        url: '/api/auth/current',
        method: 'get',
      })
        .then((res) => {
          this.confirmLoading = false
          if (res.code == 0) {
            this.setForm(res.data)
          } else {
            this.$notification.error({
              message: res.msg,
            })
          }
        })
        .catch(() => {
          this.confirmLoading = false
        })
    },
    setavatar(url) {
      this.option.img = url
    },
    setForm(data) {
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(data, 'username', 'mobile'))
      })
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('newPwd')) {
        callback('您两次输入的密码不一致!')
      } else {
        callback()
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form
      if (value && this.confirmDirty) {
        form.validateFields(['newPwdConfirm'], { force: true })
      }
      callback()
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.confirmLoading = true
          axios({
            url: '/api/user/editPwd',
            method: 'get',
            params: values,
          }).then((res) => {
            this.confirmLoading = false
            if (res.code == 0) {
              this.$notification.success({
                message: '修改成功，将跳转至登录页',
              })
              setTimeout(() => {
                sessionStorage.removeItem(ACCESS_TOKEN)
                this.$router.push('/login/login')
              }, 3000)
            } else {
              this.$notification.error({
                message: res.msg,
              })
            }
          })
        }
      })
    },
    resetForm() {
      this.form.resetFields(['oldPwd', 'newPwd', 'newPwdConfirm'])
    },
  },
}
</script>

<style lang="less" scoped>
.avatar-upload-wrapper {
  height: 200px;
  width: 100%;
}

.ant-upload-preview {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;

  .upload-icon {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 1.4rem;
    padding: 0.5rem;
    background: rgba(222, 221, 221, 0.7);
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  .mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: opacity 0.4s;

    &:hover {
      opacity: 1;
    }

    i {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      color: #d6d6d6;
    }
  }

  img,
  .mask {
    width: 100%;
    max-width: 180px;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>
