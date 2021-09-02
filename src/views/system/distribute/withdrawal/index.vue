<template>
  <div class="settings-info-view">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form" layout="vertical" :labelCol="labelCol" :wrapperCol="wrapperCol" @submit="handleOk">
        <a-form-item label="启用提现" style="margin-bottom: 0; margin-top: 15px">
          <a-radio-group v-decorator="['enable_withdrawal', validatorRules.withdrawal]">
            <a-radio value="1">开启</a-radio>
            <a-radio value="0">关闭</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="启用提现时限" style="margin-bottom: 0; margin-top: 15px">
          <a-radio-group v-decorator="['enable_withdrawal_exp', validatorRules.enableExp]" @change="radioChange">
            <a-radio :style="radioStyle" value="1"
              >开启
              <span style="margin-left: 20px">
                时限为　
                <a-input-number
                  :min="1"
                  :disabled="isDisabled"
                  v-decorator="['withdrawal_exp', validatorRules.exp]"
                /><span class="form-unit-text">天</span>
              </span>
            </a-radio>
            <a-radio :style="radioStyle" value="0">关闭</a-radio>
          </a-radio-group>
        </a-form-item>
        <!-- <a-form-item label="提现打款方式" style="margin-bottom: 0; margin-top: 15px">
          <a-radio-group v-decorator="['withdrawal_method', validatorRules.method]">
            <a-radio value="1">自动</a-radio>
            <a-radio value="0">手动</a-radio>
          </a-radio-group>
        </a-form-item> -->
        <a-form-item class="form-btn">
          <a-button type="primary" html-type="submit">保　存</a-button>
        </a-form-item>
      </a-form>
    </a-spin>
  </div>
</template>

<script>
import modalMixin from '@/components/Mixins/modal'
import indexMixin from './mixin/index'
export default {
  mixins: [modalMixin, indexMixin],
  components: {},
}
</script>

<style lang="less" scoped>
</style>