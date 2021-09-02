<template>
  <div class="settings-info-view">
    <a-spin :spinning="confirmLoading">
      <a-form :labelCol="labelCol" :wrapperCol="wrapperCol" :form="form" @submit="handleOk">
        <a-form-item label="结算方式">
          <a-radio-group v-decorator="['settlement_method',validatorRules.method]">
            <a-radio value="1">开启</a-radio>
            <a-radio value="0">关闭</a-radio>
          </a-radio-group>
          <a-popover placement="right">
            <template slot="content">
              <div>自动结算：在用户充值成功2日后可进行提现。</div>
              <div>人工结算：需要手动对分销订单进行结算至分销员可提现余额账户。</div>
            </template>
            <a href>结算规则</a>
          </a-popover>
        </a-form-item>
        <a-form-item label="打款账户" help="线上打款，需同主体微信支付商户号，且开通了企业付款到零钱功能" style="margin-bottom: 24px">
          <template v-if="isShow">
            <a-input allowClear type="number" v-decorator="['pay_parnter_id', validatorRules.pay]" />
          </template>
          <template v-else>暂未设置微信支付商户号，</template>
          <a @click="isShow = !isShow">点击设置</a>
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