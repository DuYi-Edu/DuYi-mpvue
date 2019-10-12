<template>
  <div class="container">
    <div class="text">
      <span>{{direction}}</span>
      <span>{{angle}}</span>
    </div>
    <div class="pic">
      <img src="/static/images/compass.png" alt="image" :style="'transform:rotate('+rotate+'deg)'">
    </div>
  </div>
</template>

<script>

export default {
  components: {
    
  },

  data () {
    return {
      direction:"--",
      angle:"--",
      rotate:''
    }
  },

  onLoad () {
    console.log("logs onload")
    let that = this
    //使用罗盘定义，如果手机没有罗盘onCompassChange无法进入
    wx.onCompassChange((res)=>{
      let directions = res.direction.toFixed(2)
      let radios = res.direction.toFixed(0)
      that.angle = directions
      that.rotate = 360 - radios
      this.direction = this.check(radios)
    })
    setTimeout(()=>{
      if(that.direction == '--' && that.angle == '--'){
        wx.showToast({
          title:'手机没有子罗盘',
          icon:'loading',
          duration:2000
        })
      }
    },3000)
  },
  methods:{
    check(i){
      if(15<i && i<=75){
        return '东北'
      }else if(75<i && i<105){
        return '正东'
      }else if(105<i && i<=165){
        return '东南'
      }else if(165<i && i<=195){
        return "正南"
      }else if(195<i && i<=255){
        return "西南"
      }else if(255<i && i<=285){
        return "正西"
      }else if(285<i && i<=345){
        return "西北"
      }else{
        return '正北'
      }
    }
  }
}
</script>

<style>
.text{
  text-align: center;
  color: white;
  font-size: 56rpx;
  padding-top: 50rpx;
  display: flex;
  flex-direction: column;
}
.pic{
  width:650rpx;
  height: 650rpx;
  position: absolute;
  top:50%;
  left:50rpx;
  margin-top: -300rpx;
}

.pic img{
  width: 100%;
  height: 100%;
}
</style>
