<template>
  <div>
      <div class="newsTitle">{{newsTitle}}</div>
      <div class="newsImg">
          <image :src="newsImg"></image>
      </div>
  </div>
</template>

<script>
export default {
    props:['newsTitle','newsImg'],
    data(){

    },
    methods:{

    }
}
</script>

<style>
.newsTitle{
    width: 100%;
    height: 60rpx;
    line-height: 60rpx;
    margin: 0 10rpx;
    font-size:30rpx;
}
.newsImg{
    width: 100%;
    height: 240rpx;
    border:1rpx solid gray;
    padding-bottom: 30rpx;
}

.newsImg image{
    width: 100%;
    height: 100%;
}
</style>