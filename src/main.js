// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import i18n from './locales'
import {
  VueAxios
} from './utils/request'
import ProLayout, {
  PageHeaderWrapper
} from '@ant-design-vue/pro-layout'
import themePluginConfig from '../config/themePluginConfig'

// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
// import './mock'

import bootstrap from './core/bootstrap'
import './core/lazy_use'
import './permission' // permission control
import './utils/filter' // global filter
import './global.less'
import './assets/css/style.less'

Vue.config.productionTip = false

// mount axios to `Vue.$http` and `this.$http`
Vue.use(VueAxios)
Vue.component('pro-layout', ProLayout)
Vue.component('page-header-wrapper', PageHeaderWrapper)

window.umi_plugin_ant_themeVar = themePluginConfig.theme

Vue.prototype.validateMobile = (rule, value, callback) => {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
  if (reg.test(value)) {
    callback();
  } else {
    callback('请输入正确的手机号码');
  }
}
Vue.prototype.validateNumber = (rule, value, callback) => {
  const reg = /^[0-9]*$/;
  if (reg.test(value)) {
    callback();
  } else {
    callback('只能为数字');
  }
}

new Vue({
  router,
  store,
  i18n,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')