<template>
  <div class="settings-info-view">
    <a-spin :spinning="confirmLoading">
      <a-form layout="vertical" :labelCol="labelCol" :wrapperCol="wrapperCol" :form="form" @submit="handleOk">
        <a-form-item label="升级机制" style="margin-bottom: 0; margin-top: 15px">
          <a-radio-group v-decorator="['enable_level_up', validatorRules.level]">
            <a-radio value="1">开启</a-radio>
            <a-radio value="0">关闭</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-card title="角色等级" :bordered="false" size="small" style="margin-bottom: 24px">
          <a slot="extra" href="#">
            <a-button type="primary" @click="handleAdd">添加</a-button>
          </a>
          <a-table
            :columns="columns"
            :dataSource="dataSource"
            :loading="localLoading"
            rowKey="id"
            :pagination="false"
            size="middle"
          >
            <span slot="levelName" slot-scope="text, record, index">
              <template v-if="record.editable">
                <a-input
                  placeholder="等级名称"
                  :value="text"
                  @change="(e) => handleChange(e.target.value, index, 'levelName')"
                />
              </template>
              <template v-else>{{ text }}</template>
            </span>
            <span slot="order" slot-scope="text, record, index">
              <template v-if="record.editable">
                <a-input-number :value="text" :min="1" :max="10" @change="(val) => handleChange(val, index, 'order')" />
              </template>
              <template v-else>{{ text }}</template>
            </span>
            <span slot="levelCondition" slot-scope="text, record, index">
              <template v-if="record.editable">
                <a-select
                  placeholder="升级条件"
                  :value="text"
                  @change="(e) => handleChange(e, index, 'levelCondition')"
                  style="width: 150px"
                >
                  <a-select-option v-for="item in Object.keys(levelCondition)" :key="item" :value="item">{{
                    levelCondition[item].value
                  }}</a-select-option>
                </a-select>
                <template v-if="record.levelCondition == 'c'">
                  <a-input-number
                    :value="record.levelCCharge"
                    :min="1"
                    @change="(val) => handleChange(val, index, 'levelCCharge')"
                    style="margin-left: 5px"
                  />
                  元
                </template>
                <template v-if="record.levelCondition == 'o'">
                  <a-input-number
                    :value="record.levelCOrder"
                    :min="1"
                    @change="(val) => handleChange(val, index, 'levelCOrder')"
                    style="margin-left: 5px"
                  />
                  元
                </template>
                <template v-if="record.levelCondition == 'i'">
                  <a-input-number
                    :value="record.levelCInvite"
                    :min="1"
                    @change="(val) => handleChange(val, index, 'levelCInvite')"
                    style="margin-left: 5px"
                  />
                  个
                </template>
              </template>
              <template v-else
                >{{ levelCondition[text].value }}{{ record[levelCondition[text].key]
                }}{{ levelCondition[text].unit }}</template
              >
            </span>
            <span slot="levelCommission" slot-scope="text, record, index">
              <template v-if="record.editable">
                <p>
                  充值奖励　<a-input-number
                    :value="record.levelCharge"
                    :min="0"
                    @change="(e) => handleChange(e, index, 'levelCharge')"
                  />　%
                </p>
                <p>
                  订单奖励　<a-input-number
                    :value="record.levelOrder"
                    :min="0"
                    @change="(e) => handleChange(e, index, 'levelOrder')"
                  />　%
                </p>
                <p>
                  邀请奖励　<a-input-number
                    :value="record.levelInvite"
                    :min="0"
                    @change="(e) => handleChange(e, index, 'levelInvite')"
                  />　元
                </p>
              </template>
              <template v-else>
                <p>充值奖励　{{ record.levelCharge || 0 }}%</p>
                <p>订单奖励　{{ record.levelOrder || 0 }}%</p>
                <p>邀请奖励　{{ record.levelInvite || 0 }}元</p>
              </template>
            </span>
            <span slot="action" slot-scope="text, record, index">
              <template>
                <span v-if="record.editable">
                  <a @click="handleSave(record, index)">保存</a>
                  <a-divider type="vertical" />
                  <a @click="handleCancel(record, index)">取消</a>
                </span>
                <span v-else>
                  <a @click="handleEdit(record, index)">编辑</a>
                </span>
              </template>
              <a-divider type="vertical" />
              <a @click="handleDel(record, index)">删除</a>
            </span>
          </a-table>
        </a-card>
        <a-form-item class="form-btn">
          <a-button type="primary" html-type="submit">保　存</a-button>
        </a-form-item>
      </a-form>
    </a-spin>
  </div>
</template>

<script>
import baseMixin from '@/components/Mixins/base'
import modalMixin from '@/components/Mixins/modal'
import indexMixin from './mixin/index'
export default {
  mixins: [baseMixin, modalMixin, indexMixin],
  components: {},
}
</script>

<style lang="less" scoped>
.ul-box {
  padding-left: 0;
  margin-bottom: 0;
}
</style>
``