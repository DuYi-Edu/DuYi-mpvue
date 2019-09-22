<template>
  <div class="container">
      <div class="userinfo">
          <img :src="avatarUrl" alt="image" class="userinfo-avatar">
          <span class="userinfo-nickname">{{nickname}}</span>
      </div>
      <div class="usermotto">
          <span class="user-motto">Hello friend</span>
          <span class="loginBtn" @click="loginCenterIndex">欢迎进入》</span>
      </div>
  </div>
</template>

<script>
export default {
    onLoad(){
       //获取用户信息wx.login
       this.getuserinfo()
    },
    mounted(){

    },
    data(){
        return{
            nickname:'',
            avatarUrl:''
        }
    },
    methods:{
        // 进入登录中心首页
        loginCenterIndex(){
            // 跳转
            wx.navigateTo({
                url:'/pages/centerPage/main?nickname='+this.nickname
            })
        },
        // 获取用户信息
        getuserinfo(){
            wx.getUserInfo({
                success:(res)=>{
                    this.nickname = res.userInfo.nickName
                    this.avatarUrl = res.userInfo.avatarUrl
                }
            })
        },
    }
}
</script>

<style>
.container{
    background: -webkit-linear-gradient(top,#fff,#a0fefb)
}
.userinfo{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.userinfo-avatar{
    width: 128rpx;
    height: 128rpx;
    margin: 20rpx;
    border-radius: 50%;
}
.userinfo-nickname{
    color:#aaa;
}
.usermotto{
    margin-top: 400rpx;
}
.user-motto{
    text-align: center;
}
.loginBtn{
    display: block;
    width: 260rpx;
    height: 60rpx;
    color:#232;
    font-size:40rpx;
    line-height: 60rpx;
    margin: 10rpx;
    font-family: "微软雅黑"
}
</style>