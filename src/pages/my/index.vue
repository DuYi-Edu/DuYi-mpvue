<template>
  <div class="container">
    <!-- 用户信息 -->
    <div class="userinfo">
      <img class="userinfo-avatar" :src="userInfo.avatarUrl" alt="image"/>
      <span class="userinfo-nickname">{{userInfo.nickName}}</span>
    </div>
    <!-- 列表 -->
    <div class="info_list">
      <block v-for="item in userListInfo" :key="index">
        <mymenu :text="item.text" 
          :unreadNum="item.unreadNum" 
          :icon="item.icon" 
          :isunread="item.isunread"/>
        
      </block>
    </div>
  </div>
</template>

<script>
import dataList from "@/utils/data"
import mymenu from "@/components/menu"
export default {
    onLoad(){
      this.getUserInfo()
    },
    components:{
      mymenu
    },
    data(){
        return{
          userInfo:{},
          userListInfo:dataList.userListInfo
        }
    },
    methods:{
      getUserInfo(){
        var that = this
        wx.getUserInfo({
          success:(res)=>{
            that.userInfo = res.userInfo
          }
        })
      }
    }
}
</script>

<style>
.container{
  width: 100%;
  background-color: #F2F2F2;
}

.userinfo{
 display:flex;
  flex-direction: column;
  padding:100rpx 0;
  align-items: center;
  background-color:#235dda;
}
.userinfo-avatar{
  width:128rpx;
  height: 128rpx;
  margin:40rpx;
  border-radius: 50%;
}
.userinfo-nickname{
  color:#333;
}

.info_list{
  width: 100%;
}

</style>