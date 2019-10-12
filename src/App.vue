<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

    let logs
    if (mpvuePlatform === 'my') {
      logs = mpvue.getStorageSync({key: 'logs'}).data || []
      logs.unshift(Date.now())
      mpvue.setStorageSync({
        key: 'logs',
        data: logs
      })
    } else {
      logs = mpvue.getStorageSync('logs') || []
      logs.unshift(Date.now())
      mpvue.setStorageSync('logs', logs)
    }
  },
  log () {
    console.log(`log at:${Date.now()}`)
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
.page{
    height: 100%;
    font-family: "PingFang SC",sans-serif
}
.page-bottom{
    height: 100%;
    width: 750rpx;
    position: fixed;
    background-color: rgb(0,68,97);
    z-index: 0;
}
.wc{
    color: white;
    padding:30rpx 0 30rpx 40rpx;
}
.page-content{
    padding-top:300rpx;
}
.page-top{
    height: 100%;
    position: fixed;
    width: 750rpx;
    background-color: rgb(57,125,230);
    z-index: 0;
    transition: All 0.4s ease;
}
.page-top .top-img{
    position: absolute;
    width: 68rpx;
    height: 38rpx;
    left: 20rpx;
    top:20rpx;
}
.text{
    margin: 20rpx 0 0 130rpx;
    vertical-align: middle;
    color: wheat;
}
.c-state1{
    transform: rotate(0deg) scale(1) translate(75%,0%)
}
.c-state2{
    transform:rotate(0deg) scale(.8) translate(75%,0%)
}
</style>
