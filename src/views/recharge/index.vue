<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="24">
            <a-col :md="8" :sm="24">
              <a-form-item label="关键词">
                <a-input allowClear v-model="queryParam.condition.keyWord" placeholder="用户名/手机号" />
              </a-form-item>
            </a-col>
            <a-col :md="9" :sm="24">
              <a-form-item label="交易时间" class="date-picker-box">
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
        rowKey="id"
        :pagination="pagination"
        size="middle"
      >
        <span slot="userImage" slot-scope="text">
          <a-avatar size="large" shape="square" :src="text" />
        </span>
        <span slot="user" slot-scope="text, record">
          <div>{{ record.userName }}</div>
          <div>{{ record.userPhone }}</div>
        </span>
        <span slot="distributorStatus" slot-scope="text">
          <span :class="text | statusTypeFilter">{{ text | statusFilter }}</span>
        </span>
        <template v-for="col in ['amount']" :slot="col" slot-scope="text">
          <div :key="col">
            <template>
              <a-statistic prefix="￥" :value="text | amountFilter" :value-style="valueStyle"></a-statistic>
            </template>
          </div>
        </template>
      </a-table>
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
