<template>
  <a-drawer
    title="设备订单详细"
    :maskClosable="true"
    :width="640"
    placement="right"
    :closable="true"
    @close="handleCancel"
    :visible="visible"
  >
    <a-spin :spinning="confirmLoading">
      <a-descriptions title="基本信息" :column="2">
        <a-descriptions-item label="订单号" :span="2">{{ model.orderId }}</a-descriptions-item>
        <a-descriptions-item label="商品名称">{{ model.goodsName }}</a-descriptions-item>
        <a-descriptions-item label="商品价格">
          <a-statistic prefix="￥" :value="model.goodsPrice" :value-style="{ fontSize: '14px' }"></a-statistic>
        </a-descriptions-item>
        <a-descriptions-item label="成本价">
          <a-statistic prefix="￥" :value="model.goodsCostPrice" :value-style="{ fontSize: '14px' }"></a-statistic>
        </a-descriptions-item>
        <a-descriptions-item label="商品货号">{{ model.goodsNo }}</a-descriptions-item>
        <a-descriptions-item label="收款帐号" :span="2">{{
          !model.payAppId || model.payAppId == 'null' ? '无' : model.payAppId
        }}</a-descriptions-item>
        <a-descriptions-item label="支付方式" :span="2">{{ this.payWayList[model.payWay] }}</a-descriptions-item>
        <a-descriptions-item label="商户号" :span="2">{{ model.payPid }}</a-descriptions-item>
        <a-descriptions-item label="退款状态" :span="2">{{ model.backMoneyStatus }}</a-descriptions-item>
        <a-descriptions-item label="退款失败的错误消息" :span="2">{{ model.backMoneyError }}</a-descriptions-item>
      </a-descriptions>
      <!-- 订单 -->
      <!-- <a-list class="demo-loadmore-list" item-layout="horizontal" :data-source="model.orderItemList">
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
      </a-list> -->
      <a-divider class="my-divider" />
      <a-descriptions title="设备信息" :column="2">
        <a-descriptions-item label="设备编号">{{ model.deviceId }}</a-descriptions-item>
        <a-descriptions-item label="运营商编号">{{ model.departmentId }}</a-descriptions-item>
        <a-descriptions-item label="IP地址">{{ model.ipAddress }}</a-descriptions-item>
        <a-descriptions-item label="设备SIM卡号">{{ model.deviceImsi }}</a-descriptions-item>
        <a-descriptions-item label="设备模块号">{{ model.deviceImei }}</a-descriptions-item>
        <a-descriptions-item label="销售柜子标识">{{ model.deviceTag }}</a-descriptions-item>
        <a-descriptions-item label="设备类型">{{ model.deviceType | deviceTypeFilter }}</a-descriptions-item>
        <a-descriptions-item label="记录到库时间">{{ model.gmtCreate }}</a-descriptions-item>
        <a-descriptions-item label="设备销售时间">{{ model.deviceDate }}</a-descriptions-item>
      </a-descriptions>
    </a-spin>
  </a-drawer>
</template>

<script>
import modalMixin from '@/components/Mixins/modal'
import { axios } from '@/utils/request'
const payWayList = {
  0: '免费',
  1: '现金',
  2: '支付宝',
  3: '微信',
  4: '银联',
  5: '刷卡',
  6: '积分',
  8: '支付宝刷脸',
  9: '收钱吧支付',
  31: '取货码'
}
const orderStatusList = {
  SUCCESS: '成功',
  FAILED: '失败'
}
export default {
  name: 'DevicedDetail',
  mixins: [modalMixin],
  components: {},
  data() {
    return {
      Urls: {
        getByIdUrl: '/api/device/order/get/'
      },
      payWayList,
      orderStatusList
    }
  },
  filters: {
    deviceTypeFilter: val => {
      if (!val) {
        return ''
      }
      if (val == 1) {
        return '弹簧'
      } else if (val == 2) {
        return '咖啡种类'
      } else if (val == 3) {
        return '格子柜'
      } else if (val == 4) {
        return '履带'
      }
    }
  },
  computed: {},
  methods: {
    beforeOpen(record) {},
    setForm(data) {
      this.model = data
    }
  }
}
</script>

<style lang="less" scoped></style>
