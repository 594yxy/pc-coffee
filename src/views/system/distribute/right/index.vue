<template>
  <div class="settings-info-view">
    <a-spin :spinning="confirmLoading">
      <a-form :labelCol="labelCol" :wrapperCol="wrapperCol" :form="form" @submit="handleOk">
        <a-form-item label="分销员自购分佣" help="关闭后，所有分销员自己购买商品不会获得佣金" style="margin-bottom: 24px">
          <a-radio-group v-decorator="['distributor_self',validatorRules.self]">
            <a-radio value="1">开启</a-radio>
            <a-radio value="0">关闭</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="分销员建立客户关系" help="开启后，允许分销员之间建立客户关系">
          <a-radio-group v-decorator="['distributor_tree',validatorRules.tree]">
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