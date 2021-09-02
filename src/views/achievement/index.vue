<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="24">
            <a-col :md="8" :sm="24">
              <a-form-item label="关键词">
                <a-input allowClear v-model="queryParam.condition.keyWord" placeholder="手机号" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
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
        @change="handleTableChange"
      >
        <span slot="distributorImage" slot-scope="text">
          <a-avatar slot="avatar" size="large" shape="square" :src="text" />
        </span>
        <span slot="distributor" slot-scope="text, record">
          <div>{{ record.distributorName }}</div>
          <div>{{ record.distributorMobile }}</div>
        </span>
        <span slot="exportFlag" slot-scope="text">
          <template>
            <span :style="{ color: text == 0 ? '' : '#999' }">{{ text == 0 ? '未导' : '已导' }}</span>
          </template>
        </span>
        <template
          v-for="col in ['orderAllAmount', 'allAmount', 'orderAmount', 'inviteAmount']"
          :slot="col"
          slot-scope="text"
        >
          <div :key="col">
            <template>
              <a-statistic prefix="￥" :value="text | amountFilter" :value-style="valueStyle"></a-statistic>
            </template>
          </div>
        </template>
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
  name: 'achievement',
  mixins: [baseMixin, indexMixin],
  components: {
    JDate,
  },
}
</script>

<style lang="less" scoped>
</style>