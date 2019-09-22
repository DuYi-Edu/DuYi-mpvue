import Vue from 'vue'
import App from './App'

//关闭系统项目提示功能（默认）
Vue.config.productionTip = false

App.mpType = 'app' //应用（指向） 

//创建vue对象
const app = new Vue(App)
//通过vue对象完成挂载（$mount），启动我们的程序
app.$mount()
