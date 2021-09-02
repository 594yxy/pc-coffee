<template>
  <div class="settings-info-view">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form" :labelCol="labelCol" :wrapperCol="wrapperCol" @submit="handleOk">
        <div class="mode-card">
          <a-row :gutter="48">
            <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="7">
              <a-card
                style=" margin-bottom: 24px"
                :class="{ 'active': isActive==0 }"
                @click="toggleMode(0)"
              >
                <div class="mode-card-body">
                  <h1>简单模式</h1>
                  <p>客户永久有效不允许抢客</p>
                </div>
              </a-card>
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="7">
              <a-card
                style=" margin-bottom: 24px"
                :class="{ 'active': isActive==1 }"
                @click="toggleMode(1)"
              >
                <div class="mode-card-body">
                  <h1>自定义</h1>
                  <p>有效期：{{model.invite_expire==0?'15天':'永久'}}</p>
                  <p>保护期：{{(model.invite_protection !=0 && model.invite_protection !=1)?(model.invite_protection+'天'):model.invite_protection==0?'关闭':model.invite_protection==1?'永久':''}}</p>
                  <a href="javascript:;" @click="handleEdit(model)">去设置</a>
                </div>
              </a-card>
            </a-col>
          </a-row>
        </div>
        <a-form-item class="form-btn">
          <a-button type="primary" html-type="submit">保存</a-button>
        </a-form-item>
      </a-form>
    </a-spin>
    <create-form ref="modalForm" @ok="afterSubmit" />
  </div>
</template>

<script>
import modalMixin from '@/components/Mixins/modal'
import indexMixin from './mixin/index'
import CreateForm from './modules/CreateForm'
export default {
  mixins: [modalMixin, indexMixin],
  components: {
    CreateForm,
  },
}
</script>

<style lang="less" scoped>
.mode-card {
  .mode-card-body {
    text-align: center;
  }
  .ant-card {
    min-height: 160px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    position: relative;
    float: left;
    cursor: pointer;
  }
  .ant-card.active {
    border-color: @primary-color;

    &::before {
      content: '✓';
      font-size: 20px;
      position: absolute;
      bottom: -3px;
      right: 1px;
      color: #fff;
      z-index: 2;
    }
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 0;
      height: 0;
      border-bottom: 30px solid @primary-color;
      border-left: 30px solid transparent;
    }
  }
  h1 {
    font-size: 18px;
    font-weight: bold;
  }
  p {
    color: #888;
    margin-bottom: 5px;
  }
  a {
    font-size: 15px;
  }
}
</style>