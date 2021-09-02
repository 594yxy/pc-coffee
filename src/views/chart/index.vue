<template>
  <div>
    <a-card :bordered="false" :bodyStyle="{ 'padding-bottom': 0 }">
      <div class="table-page-search-wrapper" style="margin-bottom: 0">
        <a-form layout="inline">
          <a-row :gutter="24">
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
            <a-col :md="(!advanced && 4) || 24" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="handleSearch">查询</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-card>
    <a-row :gutter="24">
      <a-col :xs="24" :sm="24">
        <a-card title="门店销量统计" size="small" :bordered="false" style="margin-top: 24px">
          <a-skeleton :loading="loading" active>
            <Store :chartData="storeData" height="1000px" v-if="storeShow" />
          </a-skeleton>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12">
        <a-card title="热销商品TOP5" size="small" :bordered="false" style="margin-top: 24px">
          <a-skeleton :loading="loading" active>
            <Goods :chartData="goodData" height="300px" v-if="storeShow" />
          </a-skeleton>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12">
        <a-card title="支付类型统计" size="small" :bordered="false" style="margin-top: 24px">
          <a-skeleton :loading="loading" active>
            <PayWay :chartData="payWayData" height="300px" v-if="storeShow" />
          </a-skeleton>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import baseMixin from '@/components/Mixins/base'
import indexMixin from './mixin/index'
import JDate from '@/components/JDate/index'
import Store from './components/Store'
import Goods from './components/Goods'
import PayWay from './components/PayWay'

export default {
  name: 'Chart',
  mixins: [baseMixin, indexMixin],
  components: {
    JDate,
    Store,
    Goods,
    PayWay,
  },
}
</script>

<style lang="less" scoped>
</style>