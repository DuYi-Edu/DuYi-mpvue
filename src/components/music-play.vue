<template>
  <div class="music-play-list">
      <div class="music-play-list-item">
          <img src="/static/images/default-photo.png" alt="image" class="music-play-list-image"/>
          <div class="music-play-list-text">最近播放</div>
      </div>

      <div class="music-play-list-item">
          <img src="/static/images/play-list.png" alt="image" class="music-play-list-image"/>
          <div class="music-play-list-text">我最喜欢</div>
      </div>

      <div class="music-play-list-item">
          <img src="/static/images/yulan.png" alt="image" class="music-play-list-image"/>
          <div class="music-play-list-text">录音</div>
      </div>

  </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{

    }
}
</script>

<style>
.music-play-list{
    display: flex;
    flex-direction: column;
}
.music-play-list-item{
    height:100rpx;
    width:100%;
    display: flex;
    flex: row;
    border-bottom:1rpx solid #eee;
    padding:10rpx 10rpx;
}
.music-play-list-image{
    height: 100rpx;
    width:100rpx;
    border-radius:10rpx;
}
.music-play-list-text{
    padding: 30rpx 20rpx;
    height: 32rpx;
}
</style>