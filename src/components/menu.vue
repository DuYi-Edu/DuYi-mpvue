<template>
  <div class="weui_cell">
    <div class="weui_cell_hd">
      <img :src="icon" alt="image" />
    </div>
    <div class="weui_cell_bd">
      <div weui_cell_bd_p>{{text}}</div>
    </div>
    <div class="badge" v-if="isunread">{{unreadNum}}</div>
    <div class="with_arrow">></div>
  </div>
</template>

<script>
export default {
  props: ["text", "unreadNum", "icon", "isunread"]
};
</script>

<style>
.weui_cell {
  position: relative;
  display: flex;
  padding: 30rpx;
  -ms-flex-align: center;
  align-items: center;
  border-bottom: 2rpx solid #dadada;
}
.weui_cell_hd {
  display: inline-block;
  width: 20px;
  margin-right: 10rpx;
}
.weui_cell_hd image {
  width: 100%;
  height: 40rpx;
  vertical-align: -4rpx;
}
.weui_cell_bd {
  display: inline-block;
}
.weui_cell_bd_p {
  font-size: 28rpx;
  color: 939393;
}
.badge {
  position: absolute;
  top: 36rpx;
  right: 80rpx;
  width: 30rpx;
  height: 30rpx;
  background-color: #f00;
  color: #fff;
  border-radius: 50%;
  text-align: center;
  font-size: 16rpx;
}
.with_arrow {
  position: absolute;
  top: 36rpx;
  right: 30rpx;
  width: 30rpx;
  height: 30rpx;
}
</style>