<template>
<div class="item-type4">
  <img class="item-type4-left-image" :src="imgurl0" alt="image" mode="aspectFill" @click="bannerImageTap" :data-id="articleid0">
  <img class="item-type4-right-image" :src="imgurl1" alt="image" mode="aspectFill" @click="bannerImageTap" :data-id="articleid1">
</div>
</template>

<script>
export default {
    props:['imgurl0','imgurl1','articleid0','articleid1'],
    data(){
        return{

        }
    },
    methods:{
    }
}
</script>

<style>
.item-type4{
  background:white;
  display: flex;
  flex-direction: row;
  width:100%;
  height: 100%;
}

.item-type4-left-image{
  padding:15rpx;
  width:50%;
  height: 140rpx;
}
.item-type4-right-image{
  padding:15rpx;
  width:50%;
  height:140rpx;
}
</style>