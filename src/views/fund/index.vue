<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="24">
            <a-col :md="6" :sm="24">
              <a-form-item label="关键词">
                <a-input allowClear v-model="queryParam.condition.keyWord" placeholder="昵称" />
              </a-form-item>
            </a-col>
            <a-col :md="10" :sm="24">
              <a-form-item label="申请提现时间" class="date-picker-box">
                <j-date
                  @start="handleStartTime"
                  @end="handleEndTime"
                  v-if="isShowDate"
                  :showTime="false"
                  dateFormat="YYYY-MM-DD"
                ></j-date>
              </a-form-item>
            </a-col>
            <a-col :md="5" :sm="24">
              <a-form-item label="状态">
                <a-select allowClear v-model="queryParam.condition.withdrawalStatus" placeholder="请选择">
                  <a-select-option value="0">未提现</a-select-option>
                  <a-select-option value="1">已提现</a-select-option>
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

      <a-table
        :columns="columns"
        :dataSource="dataSource"
        :loading="localLoading"
        :row-selection="rowSelection"
        rowKey="id"
        :pagination="pagination"
        size="middle"
      >
        <span slot="distributorImage" slot-scope="text">
          <a-avatar size="large" shape="square" :src="text" />
        </span>
        <template v-for="col in ['withdrawalAmount']" :slot="col" slot-scope="text">
          <div :key="col">
            <template>
              <a-statistic prefix="￥" :value="text | amountFilter" :value-style="valueStyle"></a-statistic>
            </template>
          </div>
        </template>
        <span slot="action" slot-scope="text, record">
          <template v-if="record.withdrawalStatus == 'AUDIT'">
            <a @click="handleFund(record, 'PASS')">同意</a>
            <a-divider type="vertical" />
            <a @click="handleFund(record, 'CANCEL')">不同意</a>
          </template>
        </span>
      </a-table>
      <div class="table-operate" v-if="dataSource && dataSource.length > 0">
        <a-button icon="export" type="primary" @click="handleDerive">导出</a-button>
      </div>
    </a-card>
  </div>
</template>

<script>
import baseMixin from '@/components/Mixins/base'
import indexMixin from './mixin/index'
import JDate from '@/components/JDate/index'

export default {
  name: 'recharge',
  mixins: [baseMixin, indexMixin],
  components: {
    JDate,
  },
}
</script>

<style lang="less" scoped>
</style>