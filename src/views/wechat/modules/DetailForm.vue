<template>
  <a-drawer
    title="商品订单详细"
    :maskClosable="true"
    :width="600"
    placement="right"
    :closable="true"
    @close="handleCancel"
    :visible="visible"
  >
    <a-spin :spinning="confirmLoading">
      <a-descriptions title="基本信息" :column="2">
        <a-descriptions-item label="商品订单号" :span="2">{{ model.orderCode }}</a-descriptions-item>
        <a-descriptions-item label="用户名">{{ model.userName }}</a-descriptions-item>
        <a-descriptions-item label="手机号">{{ model.mobile }}</a-descriptions-item>
        <a-descriptions-item label="订单数量">{{
          model.orderItemList ? model.orderItemList.length : 0
        }}</a-descriptions-item>
        <a-descriptions-item label="实际付款金额">
          <a-statistic
            prefix="￥"
            :value="model.actualPayAmount | amountFilter"
            :value-style="{ fontSize: '14px' }"
          ></a-statistic>
        </a-descriptions-item>
        <a-descriptions-item label="创建时间" :span="2">{{ model.createTime }}</a-descriptions-item>
        <a-descriptions-item label="门店名称" :span="2">{{ model.storeName }}</a-descriptions-item>
        <a-descriptions-item label="取货码" :span="2">{{ model.pickUpGoodsNo }}</a-descriptions-item>
        <a-descriptions-item label="取货机ID" :span="2">{{ model.machId }}</a-descriptions-item>
      </a-descriptions>
      <!-- 订单 -->
      <a-list class="demo-loadmore-list" item-layout="horizontal" :data-source="model.orderItemList">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-list-item-meta :description="item.productProperty">
            <span slot="title">{{ item.productName }}</span>
          </a-list-item-meta>
          <a-statistic
            prefix="￥"
            :value="item.productPrice | amountFilter"
            :value-style="{ fontSize: '16px' }"
          ></a-statistic>
        </a-list-item>
      </a-list>

      <a-divider class="my-divider" />
      <a-descriptions title="其它信息" :column="2">
        <a-descriptions-item label="接单时间">{{ model.acceptTime }}</a-descriptions-item>
        <a-descriptions-item label="实际到达时间">{{ model.actualArrivalTime }}</a-descriptions-item>
        <a-descriptions-item label="配送时间">{{ model.deliveryTime }}</a-descriptions-item>
        <a-descriptions-item label="订单配送费">{{ model.deliverFee | amountFilter }}</a-descriptions-item>
        <a-descriptions-item label="订单总优惠金额">{{ model.discountAmount | amountFilter }}</a-descriptions-item>
        <a-descriptions-item label="下单渠道">{{ model.orderClient }}</a-descriptions-item>
        <a-descriptions-item label="订单状态">{{ model.orderStatusDesc }}</a-descriptions-item>
        <a-descriptions-item label="支付渠道">{{ model.payChannelName }}</a-descriptions-item>
        <a-descriptions-item label="取货时间">{{ model.pickTime }}</a-descriptions-item>
        <a-descriptions-item label="签收送达时间">{{ model.receiveTime }}</a-descriptions-item>
        <a-descriptions-item label="订单备注" :span="2">{{ model.remark }}</a-descriptions-item>
      </a-descriptions>
    </a-spin>
  </a-drawer>
</template>

<script>
import pick from 'lodash.pick'
import modalMixin from '@/components/Mixins/modal'
import { axios } from '@/utils/request'

export default {
  name: 'DetailGoods',
  mixins: [modalMixin],
  components: {},
  data() {
    return {
      Urls: {
        getByIdUrl: '/api/order/get/',
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