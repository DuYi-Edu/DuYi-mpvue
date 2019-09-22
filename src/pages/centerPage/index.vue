<template>
  <div class="container wrap">
      <div class="nickname">{{nickname}}</div>
      <div>Welcome to here</div>
      <div class="textBox">我是机器人兔兔</div>
      <div class="btnBox">
          <button type="primary" @click="chatWithMe" size="mini">跟我聊天吧</button>
      </div>
  </div>
</template>

<script>
export default {
    onLoad(res){
        this.nickname=res.nickname
    },
    data(){
        return{
            nickname:''
        }
    },
    methods:{
        chatWithMe(){
            //跳转聊天界面
            mpvue.navigateTo({
                url:'/pages/chatBox/main'
            })
        }
    }
}
</script>

<style>
.nickname{
    font-size: 60rpx;
}
.wrap{
    font-size:60rpx;
}
.btnBox{
    margin: 20rpx 0;
}
.textBox{
    margin: 100rpx 0;
}
</style>