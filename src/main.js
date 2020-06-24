import Vue from 'vue'
import App from './App'

var Fly = require('flyio/dist/npm/wx')
var fly = new Fly()
fly.config.baseURL = 'http://106.14.124.157:3001/'

Vue.prototype.$http = fly // 将fly实例挂在vue原型上

Vue.config.productionTip = false
App.mpType = 'app'

// 添加请求拦截器
fly.interceptors.request.use((request) => {
  // 给所有请求添加自定义header

  // 可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
  return request
})

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response) => {
    console.log(response)

    // 只将请求结果的data字段返回
    return response.data
  }
)

const app = new Vue(App)
app.$mount()
