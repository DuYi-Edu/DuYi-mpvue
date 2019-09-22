import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

//Vue.prototype.$ss = App


const app = new Vue(App)
app.$mount()
//使用微信的getApp().globalData方法注册在vue的原型上
//需要注意，定义要放在app.$mount挂载之后
Vue.prototype.globalData = getApp().globalData