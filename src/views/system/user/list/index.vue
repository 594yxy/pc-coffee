<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="24">
            <a-col :md="10" :sm="24">
              <a-form-item label="关键词">
                <a-input allowClear v-model="queryParam.condition.keyWord" placeholder="用户名/手机号" />
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
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="handleAdd">新增用户 </a-button>
      </div>
      <a-table
        :columns="columns"
        :dataSource="dataSource"
        :loading="localLoading"
        rowKey="id"
        :pagination="pagination"
        size="middle"
      >
        <span slot="image" slot-scope="text">
          <a-avatar size="large" shape="square" :src="text" />
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">编辑</a>
            <a-divider type="vertical" />
          </template>
          <a @click="handleDel(record)">删除</a>
        </span>
      </a-table>

      <form-modal ref="modalForm" @ok="afterSubmit"></form-modal>
    </a-card>
  </div>
</template>

<script>
import baseMixin from '@/components/Mixins/base'
import indexMixin from './mixin/index'
import { Ellipsis } from '@/components'
import FormModal from './modules/FormModal'
import JDate from '@/components/JDate/index'
import TableToolbar from '@/components/TableToolbar/index'

export default {
  name: 'UserList',
  mixins: [baseMixin, indexMixin],
  components: {
    Ellipsis,
    FormModal,
    JDate,
    TableToolbar,
  },
}
</script>
