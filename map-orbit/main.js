import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
var token = getUrlParam("token")
var transportId = getUrlParam("transportId")
var transportCode = getUrlParam('transportCode')
console.log(token)
console.log(transportId)
console.log(transportCode)
uni.setStorageSync('APP_AJOTPS_WEBTOKEN', token)
uni.setStorageSync('APP_AJOTPS_WEBTSID', transportId)
uni.setStorageSync('APP_AJOTPS_WEBTSCODE', transportCode)

// 全局挂载封装的请求
import https from './utils/https.js';
Vue.prototype.$https = https

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif