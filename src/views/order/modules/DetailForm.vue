<template>
  <a-drawer
    title="分销订单详细"
    :maskClosable="true"
    :width="720"
    placement="right"
    :closable="true"
    @close="handleCancel"
    :visible="visible"
  >
    <a-spin :spinning="confirmLoading">
      <a-card :bordered="false">
        <a-descriptions :column="2">
          <a-descriptions-item label="头像" :span="2">
            <a-avatar shape="square" :size="80" :src="model.image" />
          </a-descriptions-item>
          <a-descriptions-item label="订单号" :span="2">{{model.orderCode}}</a-descriptions-item>
          <a-descriptions-item label="昵称">{{model.distributorName}}</a-descriptions-item>
          <a-descriptions-item label="手机号">{{model.distributorMobile}}</a-descriptions-item>
          <a-descriptions-item label="订单金额">{{model.actualPayAmount}}</a-descriptions-item>
          <a-descriptions-item label="商品佣金">{{model.discountAmount}}</a-descriptions-item>
          <a-descriptions-item label="邀请奖励">{{model.distributorAmount}}</a-descriptions-item>
          <a-descriptions-item label="交易时间">{{model.startTime}}</a-descriptions-item>
          <a-descriptions-item label="结算状态">{{model.distributorStatusDesc}}</a-descriptions-item>
          <a-descriptions-item label="订单类型">{{model.orderType}}</a-descriptions-item>
          <a-descriptions-item label="订单状态">{{model.orderStatusDesc}}</a-descriptions-item>
          <a-descriptions-item label="订单原金额">{{model.originalAmount}}</a-descriptions-item>
        </a-descriptions>
      </a-card>
    </a-spin>
  </a-drawer>
</template>

<script>
import pick from 'lodash.pick'
import modalMixin from '@/components/Mixins/modal'
import { axios } from '@/utils/request'

export default {
  name: 'DetailDistribute',
  mixins: [modalMixin],
  components: {},
  data() {
    return {
      Urls: {
        getByIdUrl: '/api/user/card/trade/get/'
      },
    }
  },
  computed: {},
  methods: {
    beforeOpen(record) {},
    setForm(data) {
      this.model = data
    },
  },
}
</script>

<style lang="less" scoped>
</style>