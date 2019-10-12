<template>
  <div class="item_type2">
    <div class="item-type2-top">
      <div class="item-type2-left">
        <div class="item-type2-title">{{datatitle}}</div>
      </div>
      <div class="item-type2-right">
        <img :src="dataimg" alt="image" mode="aspectFill" class="item-type2-image" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['datatitle','dataimg'],
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>

.item-type2{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 200rpx;
  background: white;
}
.item-type2-top{
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  height: 200rpx;
  width:100%;
  background: white;
}
.item-type2-left{
  padding-top:50rpx;
  padding-left:30rpx;
  height:150rpx;
  width:60%;
}
.item-type2-title{
  word-wrap:break-word;
  word-break: normal;
  font-size: 36rpx;
  color:#595959;
  width:100%;
  height: 100%;
}
.item-type2-right{
  height: 140rpx;
  width: 180rpx;
  padding-top:30rpx;
  padding-right:30rpx;
}
.item-type2-image{
  width:100%;
  height: 100%;
}
</style>