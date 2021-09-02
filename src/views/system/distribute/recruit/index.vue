<template>
  <div class="settings-info-view">
    <a-spin :spinning="confirmLoading">
      <a-form :labelCol="labelCol" :wrapperCol="wrapperCol" :form="form" @submit="handleOk">
        <a-form-item label="分销员招募">
          <a-radio-group v-decorator="['distributor_invite',validatorRules.invite]">
            <a-radio value="1">开启</a-radio>
            <a-radio value="0">关闭</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="分销员审核"
          help="开启分销员审核功能后，消费者申请成为本店分销员需要经过商家审核"
          style="margin-bottom: 24px"
        >
          <a-radio-group v-decorator="['distributor_audit',validatorRules.audit]">
            <a-radio value="1">自动审核</a-radio>
            <a-radio value="0">人工审核</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="邀请奖励"
          help="开启后，分销员可邀请好友成为其下级分销，当下级分销员的顾客购买，上级分销员可获得奖励"
          style="margin-bottom: 24px"
        >
          <a-radio-group v-decorator="['invite_reward',validatorRules.reward]">
            <a-radio value="1">开启</a-radio>
            <a-radio value="0">关闭</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item class="form-btn">
          <a-button type="primary" html-type="submit">保存</a-button>
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