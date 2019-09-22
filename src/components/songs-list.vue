<template>
  <div class="songs-list">
      <!-- 歌曲列表 -->
      <div class="songs-item" v-for="item in items" :key="index">
          <img :src="item.coverImgUrl" alt="image" class="songs-image">
          <div class="songs-info">
            <span class="songs-name">{{item.name}}</span>
            <span class="songs-author">{{item.singer}}</span>
          </div>
          <img src="/static/images/icon-...pink.png" alt="image" class="songs-action-button">
      </div>
  </div>
</template>

<script>
import songs from '../utils/songs-list'
export default {
    mounted(){
        console.log(songs.songslist)
    },
    data(){
        return{
            items:songs.songslist
        }
    },
    methods:{

    }
}
</script>

<style>

.songs-list{
  display: felx;
  flex-direction: column; 
}

.songs-item{
  width:100%;
  height:80rpx;
  display: flex;
  flex:row;
  justify-content: space-between;
  border-bottom: 1rpx solid #eeeeee;
  padding: 10rpx 0;
  align-items:center;
}

.songs-image{
  width:80rpx;
  height: 80rpx;
  border-radius: 10rpx;
}

.songs-info{
  display:felx;
  flex-direction: column;
  width: 75%;
}

.song-name{
  font-size:28rpx;
  line-height: 40px;
}

.songs-author{
  font-size:24rpx;
  color:#929292;
  line-height: 40rpx;
}

.songs-action-button{
    height:40rpx;
    width:40rpx;
    margin-right: 10rpx;
}
</style>