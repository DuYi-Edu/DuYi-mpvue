<script>
export default {
  created () {
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
.container{
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
page{
  font-family:'Microsoft YaHei';
  font-size:28rpx;
  color:#676767;
  height: 100%;
}
input{
   font-family:'Microsoft YaHei';
}
.flex-container{
  display: flex;
  flex-direction: column
}
</style>
