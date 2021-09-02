<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="24">
            <a-col :md="6" :sm="24">
              <a-form-item label="关键词">
                <a-input allowClear v-model="queryParam.condition.keyWord" placeholder="用户名/手机号" />
              </a-form-item>
            </a-col>
            <a-col :md="10" :sm="24">
              <a-form-item label="加入时间" class="date-picker-box">
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
              <a-form-item label="审核状态">
                <a-select allowClear v-model="queryParam.condition.auditStatus" placeholder="请选择">
                  <a-select-option v-for="item in Object.keys(statusMap)" :value="item" :key="item">{{
                    statusMap[item].text
                  }}</a-select-option>
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
      <!-- <div class="table-operator">
        <table-toolbar :columns="columns" @refresh="refresh" @toolbarChange="toolbarChange"></table-toolbar>
      </div> -->
      <a-table
        :columns="columns"
        :dataSource="dataSource"
        :loading="localLoading"
        rowKey="id"
        :pagination="false"
        size="middle"
      >
        <span slot="image" slot-scope="text">
          <a-avatar size="large" shape="square" :src="text" />
        </span>
        <span slot="user" slot-scope="text, record">
          <div>{{ record.nickName }}</div>
          <div>{{ record.mobile }}</div>
        </span>
        <template v-for="col in ['balance', 'allAmount']" :slot="col" slot-scope="text">
          <div :key="col">
            <template>
              <a-statistic prefix="￥" :value="text | amountFilter" :value-style="valueStyle"></a-statistic>
            </template>
          </div>
        </template>
        <span slot="auditStatus" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="action" slot-scope="text, record">
          <template v-if="record.auditStatus != 'PASS'">
            <a @click="handleDetail(record)">审核</a>
            <a-divider type="vertical" />
          </template>
        </span>
      </a-table>

      <audit-form ref="detailForm" @ok="afterSubmit" />
    </a-card>
  </div>
</template>

<script>
import baseMixin from '@/components/Mixins/base'
import indexMixin from './mixin/index'
import { Ellipsis } from '@/components'
import AuditForm from './modules/AuditForm'
import JDate from '@/components/JDate/index'
import TableToolbar from '@/components/TableToolbar/index'

export default {
  name: 'UserList',
  mixins: [baseMixin, indexMixin],
  components: {
    Ellipsis,
    AuditForm,
    JDate,
    TableToolbar,
  },
}
</script>
