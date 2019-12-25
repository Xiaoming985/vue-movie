import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import axios from 'axios'
import http from './utils/http.js'

Vue.config.productionTip = false
// Vue.prototype.$http = axios.create({
//   baseURL: 'http://49.232.12.131:3005',
//   timeout: 10000
// })

// axios封装
Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')