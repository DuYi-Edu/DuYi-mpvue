<template>
 <div class="item-type3">
          <div class="item-type3-top">
            <img src="/static/images/iconLovePink.png" alt="image" mode="aspectFill" class="item-type3-top-image">
            <span class="item-type3-top-text">
              关爱提醒
            </span>
          </div>
          <div class="item-type3-bottom">
            <img :src="dataimg" alt="image" mode="aspectFill" class="item-type3-bottom-image"/>
            <div class="item-type3-bottom-right">
              <span class="item-type3-bottom-right-toptext">{{datatitle}}</span>
              <span class="item-type3-bottom-right-bottomtext">{{datasummary}}</span>
            </div>
          </div>
        </div>
</template>

<script>
export default {
    props:['dataimg','datatitle','datasummary'],
    data(){
        return{

        }
    },
    methods:{
        
    }
}
</script>

<style>
.item-type3{
  background:white;
  display: flex;
  flex-direction: column;
  width:100%;
  height: 240rpx;
}
.item-type3-top{
  background:white;
  display:flex;
  flex-direction: row;
  width: 100%;
  height: 50rpx;
}
.item-type3-top-image{
  width: 28rpx;
  height: 28rpx;
  padding: 15rpx;
}
.item-type3-bottom{
  background: white;
  display: flex;
  flex-direction: row;
  width:100%;
  height: 100%;
}
.item-type3-bottom-image{
  padding:25rpx;
  width:180rpx;
  height: 140rpx;
}
.item-type3-bottom-right{
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background:white;
}
.item-type3-bottom-right-toptext{
  padding-top:30rpx;
  font-size:30rpx;
  color: #595959;
  width: 100%;
  height: 50rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-type3-bottom-right-bottomtext{
  font-size:24rpx;
  padding-top:20rpx;
  color:#999;
  width:100%;
  height: 100rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>