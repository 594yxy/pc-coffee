<template>
  <a-modal
    :title="textMap[dialogStatus]"
    centered
    :visible="visible"
    :confirmLoading="confirmLoading"
    ok-text="确认生成"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :maskClosable="false"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="商品名称">
          <a-select
            v-decorator="['goodsId', validatorRules.goodsId]"
            show-search
            placeholder="请输入名称搜索并选择一个商品"
            style="width: 100%"
            :default-active-first-option="false"
            :show-arrow="false"
            :filter-option="false"
            :not-found-content="fetching ? undefined : null"
            @search="fetchGoods"
          >
            <a-spin v-if="fetching" slot="notFoundContent" size="small" />
            <a-select-option v-for="good in goodsList" :key="good.id">
              {{ good.goodsName }} {{ good.goodsCount }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="取货码首位">
          <div class="code-box">
            <a-input class="input" v-decorator="['prefix', validatorRules.prefix]" />
          </div>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="取货码个数">
          <a-input-number v-decorator="['num', validatorRules.num]" :min="1" :max="50" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="有效期">
          <a-input-number v-decorator="['expireDays', validatorRules.expireDays]" :min="1" /> 天
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import modalMixin from '@/components/Mixins/modal'
import { axios } from '@/utils/request'
import pick from 'lodash.pick'
export default {
  name: 'CodeModel',
  mixins: [modalMixin],
  data() {
    return {
      Urls: {
        addUrl: '/api/pickcode/create',
        editUrl: '/api/device/info/update/',
        goodsListUrl: '/api/goods/query'
      },
      textMap: {
        add: '生成取货码',
        edit: '编辑'
      },
      tips:{
        add: '商品取货码已生成'
      },
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      },
      validatorRules: {
        goodsId: {
          rules: [{ required: true, message: '请选择一个商品' }]
        },
        prefix: {
          rules: [{ required: true, message: '请设置第一位取货码' }, { validator: this.checkPickCode }]
        },
        num: {
          rules: [{ required: true, message: '请输入你要生成取货码的个数' }]
        },
        expireDays: {
          rules: [{ required: true, message: '请输入取货码的有效天数' }]
        },
        must: {
          rules: [{ required: true, message: '此字段为必填!' }]
        }
      },
      // 商品
      fetching: false,
      goodsList: []
    }
  },
  created() {},
  methods: {
    // 搜索商品
    fetchGoods(value) {
      console.log('search name', value)
      this.fetching = true
      axios({
        url: this.Urls.goodsListUrl,
        method: 'post',
        data: { keyWord: value }
      })
        .then(res => {
          this.fetching = false
          if (res.code == 0) {
            this.goodsList = res.data.records
          } else {
            this.$notification.error({
              message: res.msg
            })
          }
        })
        .catch(() => {
          this.fetching = false
        })
    },
    checkPickCode(rule, value, callback) {
      const reg = /^[a-zA-Z0-9]+$/
      if (value && !reg.test(value)) {
        callback('只能输入字母或者数字')
      } else {
        callback()
      }
    },
    setForm(data) {
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(data, 'goodsId', 'prefix', 'num'))
      })
    }
  }
}
</script>

<style lang="less" scoped>
.code-box {
  p {
    margin-top: 10px;
  }
  .input {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    text-align: center;
  }
}
</style>
