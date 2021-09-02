<template>
  <a-modal
    title="自定义模式设置"
    :width="600"
    centered
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    :maskClosable="false"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :labelCol="labelCol" :wrapperCol="wrapperCol" :form="form">
        <a-form-item label="有效期" help="有效期内，客户在店铺购买的业绩都算在绑定的分销员上" style="margin-bottom: 24px">
          <a-radio-group v-decorator="['invite_expire',validatorRules.expire]">
            <a-radio value="0">15天</a-radio>
            <a-radio value="1">永久</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="保护期" help="在保护期内，分销员发展的客户不会变更绑定关系">
          <a-radio-group
            @change="radioChange"
            v-decorator="['invite_protection',validatorRules.protection]"
          >
            <a-radio value="2">
              <a-input-number
                v-decorator="['invite_protection_day',validatorRules.protection]"
                :disabled="isDisabled"
                :formatter="value => `${value}天`"
                :parser="value => value.replace('天', '')"
              />
            </a-radio>
            <a-radio value="1">永久</a-radio>
            <a-radio value="0">关闭</a-radio>
          </a-radio-group>
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
  name: 'ModeForm',
  mixins: [modalMixin],
  data() {
    return {
      Urls: {
        addUrl: '',
        editUrl: '',
        getByIdUrl: '',
      },
      tips: {
        edit: '设置成功',
      },
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 3,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 21,
        },
      },
      validatorRules: {
        expire: {
          initialValue: '1',
          rules: [
            {
              required: true,
              message: '请设置有效期!',
            },
          ],
        },
        protection: {
          initialValue: '1',
          rules: [
            {
              required: true,
              message: '请设置保护期!',
            },
          ],
        },
      },
      isDisabled: true,
    }
  },
  created() {},
  methods: {
    setForm(data) {
      this.$nextTick(() => {
        if (data.invite_protection != 0 && data.invite_protection != 1) {
          this.isDisabled = false
          this.form.setFieldsValue({
            invite_expire: data.invite_expire,
            invite_protection: '2',
            invite_protection_day: data.invite_protection,
          })
        } else {
          this.isDisabled = true
          this.form.setFieldsValue({
            invite_expire: data.invite_expire,
            invite_protection: data.invite_protection,
            invite_protection_day: 0,
          })
        }
      })
    },
    beforeSubmit(form) {
      if (form.invite_protection != 0 && form.invite_protection != 1) {
        form.invite_protection = form.invite_protection_day
      }
      delete form.invite_protection_day
      return form
    },
    radioChange(e) {
      let value = e.target.value
      if (value == 2) {
        this.isDisabled = false
      } else {
        this.isDisabled = true
      }
    },
  },
}
</script>

<style lang="less" scoped>
</style>