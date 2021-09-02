<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="24">
            <a-col :md="8" :sm="24">
              <a-form-item label="关键词">
                <a-input allowClear v-model="queryParam.condition.deviceId" placeholder="设备编号" />
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="设备状态">
                <a-select allowClear v-model="queryParam.condition.deviceStatus" placeholder="请选择">
                  <a-select-option v-for="item in deviceStatusList" :value="item.value" :key="item.value">
                    {{ item.name }}
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
        <a-button type="primary" icon="plus" @click="handleAdd">新增设备</a-button>
      </div>
      <a-table
        :columns="columns"
        :dataSource="dataSource"
        :loading="localLoading"
        rowKey="id"
        :pagination="pagination"
        size="middle"
      >
        <div slot="expandedRowRender" slot-scope="record">
          <p>设备地址：{{ record.deviceAddress }}</p>
          <p>设备错误信息：{{ record.deviceErrorInfo }}</p>
        </div>
        <span slot="deviceStatus" slot-scope="text">
          <template v-if="text == 1">
            <a-badge status="success" text="正常" />
          </template>
          <template v-else-if="text == 0">
            <a-badge status="error" text="异常" />
          </template>
          <template v-else-if="text == -1">
            <a-badge status="default" text="未知" />
          </template>
        </span>
        <span slot="action" slot-scope="text, record">
          <template v-if="userName == 'admin'">
            <a @click="handleEdit(record)">编辑</a>
            <a-divider type="vertical" />
            <a @click="handleDel(record)">删除</a>
          </template>
        </span>
      </a-table>
    </a-card>
    <!-- 表单 -->
    <form-modal ref="modalForm" @ok="afterSubmit"></form-modal>
  </div>
</template>

<script>
import baseMixin from '@/components/Mixins/base'
import indexMixin from './mixin/index'
import JDate from '@/components/JDate/index'
import FormModal from './modules/FormModal'

export default {
  name: 'DeviceList',
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
