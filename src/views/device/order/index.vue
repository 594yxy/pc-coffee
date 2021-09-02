<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="24">
            <a-col :md="8" :sm="24">
              <a-form-item label="订单号">
                <a-input allowClear v-model="queryParam.condition.orderId" placeholder="订单号" />
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="支付方式">
                <a-tree-select
                  v-model="queryParam.condition.payWays"
                  allowClear
                  style="width: 100%"
                  :tree-data="payTree"
                  tree-checkable
                  placeholder="请选择"
                />
              </a-form-item>
            </a-col>
            <a-col :md="10" :sm="24">
              <a-form-item label="起止时间" class="date-picker-box">
                <j-date
                  @start="handleStartTime"
                  @end="handleEndTime"
                  v-if="isShowDate"
                  :showTime="false"
                  dateFormat="YYYY-MM-DD"
                ></j-date>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="门店名称">
                <a-input allowClear v-model="queryParam.condition.storeName" placeholder="门店名称" />
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="设备类型">
                <a-select allowClear v-model="queryParam.condition.deviceInfoType" placeholder="请选择">
                  <a-select-option v-for="item in Object.keys(deviceTypeList)" :value="item" :key="item">
                    {{ deviceTypeList[item] }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="(!advanced && 3) || 24" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="handleSearch">查询</a-button>
                <a-button style="margin-left: 8px" @click="searchReset">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class="table-operator" v-if="userName == 'admin'">
        <a-range-picker format="YYYY-MM-DD" @change="dateChange" />
        <a-button type="primary" icon="pull-request" @click="handlePull" style="margin-left: 12px">
          补录订单数据
        </a-button>
      </div>
      <a-table
        :columns="columns"
        :dataSource="dataSource"
        :row-selection="rowSelection"
        :loading="localLoading"
        rowKey="id"
        :pagination="pagination"
        size="middle"
      >
        <span slot="backMoneyStatus" slot-scope="text">
          <template v-if="text == 1">
            <a-badge status="success" text="退款成功" />
          </template>
          <template v-else-if="text == 0">
            <a-badge status="error" text="退款失败" />
          </template>
          <template v-else-if="text == -1">
            <a-badge status="default" text="未知" />
          </template>
        </span>
        <span slot="orderStatus" slot-scope="text">
          <template v-if="text == 'SUCCESS'">
            <a-badge status="success" :text="orderStatusList[text]" />
          </template>
          <template v-else-if="text == 'FAILED'">
            <a-badge status="error" :text="orderStatusList[text]" />
          </template>
        </span>
        <template v-for="col in ['goodsPrice']" :slot="col" slot-scope="text">
          <div :key="col">
            <template>
              <a-statistic prefix="￥" :value="text" :value-style="valueStyle"></a-statistic>
            </template>
          </div>
        </template>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleDetail(record)">查看详情</a>
          </template>
        </span>
      </a-table>
      <div class="table-operate" v-if="dataSource && dataSource.length > 0">
        <a-button icon="export" type="primary" @click="handleDerive">导出</a-button>
      </div>
    </a-card>
    <!-- 表单 -->
    <detail-form ref="detailForm"></detail-form>
  </div>
</template>

<script>
import baseMixin from '@/components/Mixins/base'
import indexMixin from './mixin/index'
import JDate from '@/components/JDate/index'
import DetailForm from './modules/DetailForm'

export default {
  name: 'DeviceList',
  mixins: [baseMixin, indexMixin],
  components: {
    JDate,
    DetailForm,
  },
}
</script>

<style lang="less" scoped>
.ant-avatar-lg {
  width: 48px;
  height: 48px;
  line-height: 48px;
}

.list-content-item {
  color: rgba(0, 0, 0, 0.45);
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  margin-left: 40px;
  span {
    line-height: 20px;
  }
  p {
    margin-top: 4px;
    margin-bottom: 0;
    line-height: 22px;
  }
}
</style>
