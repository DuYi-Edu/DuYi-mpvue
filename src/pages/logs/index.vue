<template>
  <div class="hongbao">
    <div class="hongbao_c">

      <div>
      <button class="share" id="shareBtn" open-type="share" type="primary">
        <img src="/static/images/hong.png" alt="image" mode="widthFix">
      </button>
      </div>
      <a href="/pages/index/main">
       <img src="/static/images/swtc_gb.png" alt="image">
       </a>
    </div>
  </div>
</template>

<script>
export default{
  data(){
    return{

    }
  },
  onShareAppMessage:(ops)=>{
    if(ops.from === 'button'){
      console.log("来自页面内转发按钮",ops.target)
    }
    return {
      title:"大吉大利",
      path:"/pages/index/main",
      success:res=>{
        //转发成功
        console.log("转发成功:",JSON.stringify(res))
      },
      fail:res=>{
        //转发失败
        console.log("转发失败:",JSON.stringify(res))
      }
    }
  },
  methods:{
    gotoIndex(){
     
    }

  }
}
</script>

<style>

.hongbao {
  background: rgba(0, 0, 0, 0.4);
  overflow: hidden;
  width: 100%;
  height: 1300rpx;
  background: url(http://weixin.hengyitz.com/images/hnyygb/bachong.jpg) no-repeat;
  background-size: 100%;
}

.hongbao_c {
  position: fixed;
  left: 0%;
  top: 50%;
  height: 498rpx;
  width: 100%;
  margin-top: -249rpx;
}

.hongbao_c a{
  position: absolute;
  top: -10rpx;
  right: 0px;
}

.hongbao_c a img{
  width: 60rpx;
  height: 60rpx;
}

.hongbao_c div {
  height: 498rpx;
  width: 100%;
}

button[type="primary"] {
  color: #fff;
  background: none;
}

</style>
