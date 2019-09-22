import Vue from 'vue'
import App from './App'
import Fly from './utils/request'


Vue.config.productionTip = false
App.mpType = 'app'

//原型注册
Vue.prototype.$fly = Fly

const app = new Vue(App)
app.$mount()
