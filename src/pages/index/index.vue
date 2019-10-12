<template>
  <div class="container">
    <div class="text">
      <span>请您远离磁场干扰</span>
      <span>并按下图所示校准指南针</span>
    </div>
    <div class="img">
      <img src="/static/images/tip.jpg" alt="image" class="tip-pic">
    </div>
    <button class="tip-btn" @click="jump">
      我知道了
    </button>
  </div>
</template>

<script>

export default {
  data () {
    return {
      
    }
  },

  components: {
 
  },

  methods: {
    //跳转
    jump(){
      mpvue.navigateTo({
        url:"/pages/logs/main"
      })
    }
  },

  created () {
    console.log("index created")
  }
}
</script>

<style scoped>
.container{
  font-family: "microsoft yehei"
}
.text{
  color:white;
  font-size:26rpx;
  text-align: center;
  padding-top:10vh;
}
.text span{
  display: flex;
  flex-direction: column;
  height: 40rpx;
  line-break: 40rpx;
}
.tip-pic{
  width: 750rpx;
  height: 375rpx;
}
.img{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
