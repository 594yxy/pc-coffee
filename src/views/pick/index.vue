<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="24">
            <a-col :md="8" :sm="24">
              <a-form-item label="商品名称">
                <a-input allowClear v-model.trim="queryParam.condition.keyWord" placeholder="商品名称/取货码" />
              </a-form-item>
            </a-col>
            <a-col :md="10" :sm="24">
              <a-form-item label="取货码生成时间" class="date-picker-box">
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
      <div class="table-operator" v-if="userName == 'admin'">
        <a-button type="primary" icon="plus" @click="handleAdd">生成取货码</a-button>
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
      </a-table>
      <div class="table-operate" v-if="dataSource && dataSource.length > 0">
        <a-button icon="export" type="primary" @click="handleDerive">导出</a-button>
      </div>
    </a-card>
    <!-- 表单 -->
    <form-modal ref="modalForm" @ok="afterSubmit"></form-modal>
  </div>
</template>

<script>
// 演示如何使用 this.$dialog 封装 modal 组件
import baseMixin from '@/components/Mixins/base'
import indexMixin from './mixin/index'
import JDate from '@/components/JDate/index'
import FormModal from './modules/FormModal'

export default {
  name: 'OrderGoods',
  mixins: [baseMixin, indexMixin],
  components: {
    JDate,
    FormModal
  }
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
