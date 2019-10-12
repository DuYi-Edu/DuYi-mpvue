<template>
  <div>
    <!-- 个人区域 -->
    <div class="amountBg">
      <div class="img">
        <open-data type="userAvatarUrl"></open-data>
      </div>
      <div class="account">
        <div class="nick-name">
          <open-data type="userNickName"></open-data>
        </div>
        <div class="address">
          <open-data type="userCountry"></open-data>
          <open-data type="userProvince"></open-data>
          <open-data type="userCity"></open-data>
        </div>
      </div>
    </div>
    <!-- 菜单列表 -->
    <div class="content">
        <block v-for="item in menuList" :key="index">
          <div :class="[index%2==1?'hr':'line']"></div>
          <mymenu :iconimg="item.icon" :title="item.title" :nav="item.navigate"/>
        </block>
    </div>
  </div>
</template>

<script>
import mymenu from "@/components/list"
import _menuList from "@/utils/datalist"
export default{
  data(){
    return {
     menuList : _menuList.menuList
    }
  },
  components:{
    mymenu
  }
}
</script>

<style>
.amountBg{
  display: flex;
  flex-direction: row;
  height: 200rpx;
  background-color: #2592d1;
  align-items: center;
}
.img{
  overflow: hidden;
  display: block;
  margin-left: 40rpx;
  width: 98rpx;
  height: 98rpx;
  border-radius: 50%;
}
.account{
  width: 70%;
  color:#fff;
  margin-left: 20rpx;
  align-items: center;
}
.nick-name{
  font-family: "Microsoft Yahei";
  font-size:32rpx;
}
.address{
  font-size:26rpx;
}
.iconImg{
  width: 44rpx;
  height: 42rpx;
}


.content{
  background-color: #f4f4f4;
  height: 1000rpx;
}
.line{
  height: 20rpx;
}
.hr{
  height: 2rpx;
  background: #ccc;
  opacity: 0.2;
}
</style>