import Vue from 'vue'
import App from './App'
import Fly from './utils/request'

//flyio原型注册
Vue.prototype.$fly = Fly

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

Vue.prototype.globalData = getApp().globalData
