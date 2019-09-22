import Vue from 'vue'
import App from './App'
import fly from './utils/request'


Vue.config.productionTip = false
App.mpType = 'app'
//原型注册
Vue.prototype.$fly = fly

const app = new Vue(App)
app.$mount()
