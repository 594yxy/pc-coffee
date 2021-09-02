<template>
  <div>
    <!-- <a-card :bordered="false">
      <a-row>
        <a-col :sm="8" :xs="24">
          <info title="我的待办" value="8个任务" :bordered="true" />
        </a-col>
        <a-col :sm="8" :xs="24">
          <info title="本周任务平均处理时间" value="32分钟" :bordered="true" />
        </a-col>
        <a-col :sm="8" :xs="24">
          <info title="本周完成任务数" value="24个" />
        </a-col>
      </a-row>
    </a-card>-->

    <a-card :bordered="false">
      <!-- <div slot="extra">
        <a-radio-group v-model="status">
          <a-radio-button value="all">全部</a-radio-button>
          <a-radio-button value="processing">进行中</a-radio-button>
          <a-radio-button value="waiting">等待中</a-radio-button>
        </a-radio-group>
        <a-input-search style="margin-left: 16px; width: 272px;" />
      </div>-->
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="24">
            <a-col :md="8" :sm="24">
              <a-form-item label="关键词">
                <a-input allowClear v-model="queryParam.condition.keyWord" placeholder="订单号/手机号" />
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
            <a-col :md="(!advanced && 3) || 24" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="handleSearch">查询</a-button>
                <a-button style="margin-left: 8px" @click="searchReset">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <!-- <div class="operate">
        <a-button type="dashed" style="width: 100%" icon="plus" @click="add">添加</a-button>
      </div>-->

      <a-table
        :columns="columns"
        :dataSource="dataSource"
        :loading="localLoading"
        rowKey="id"
        :row-selection="rowSelection"
        :pagination="pagination"
        size="middle"
      >
        <span slot="distributorImage" slot-scope="text">
          <a-avatar size="large" shape="square" :src="text" />
        </span>
        <span slot="distributor" slot-scope="text, record">
          <div>{{ record.distributorName }}</div>
          <div>{{ record.distributorMobile }}</div>
        </span>
        <span slot="distributorStatus" slot-scope="text">
          <span :class="text | statusTypeFilter">{{ text | statusFilter }}</span>
        </span>
        <template
          v-for="col in ['originalAmount', 'discountAmount', 'distributorAmount', 'actualPayAmount']"
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
        <a-button icon="export" type="primary" @click="handleDownload">导出</a-button>
      </div>
    </a-card>
    <!-- 表单 -->
    <detail-form ref="detailForm"></detail-form>
  </div>
</template>

<script>
// 演示如何使用 this.$dialog 封装 modal 组件
import baseMixin from '@/components/Mixins/base'
import indexMixin from './mixin/index'
import JDate from '@/components/JDate/index'
import DetailForm from './modules/DetailForm'

export default {
  name: 'OrderList',
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
