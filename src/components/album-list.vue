<template>
  <div class="big-photo-list">
      <div class="big-photo-item" v-for="item in albumnData" :key="index">
          <img :src="item.image" alt="image" class="photo">
          <span class="music-name">{{item.name}}</span>
          <span class="music-author">{{item.singer}}</span>
      </div>
  </div>
</template>

<script>
import album from '../utils/album-list'
export default {
    data(){
        return{
            albumnData:album.albumList
        }
    },
    methods:{

    }
}
</script>

<style>
.big-photo-list{
    width: 100%;
}

.big-photo-list{
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.big-photo-item{
  width:280rpx;
  display: flex;
  flex-direction: column;
  padding: 5rpx 0;
}

.photo{
  width:280rpx;
  height: 280rpx;
  border-radius: 10rpx;
  background: #aaaaaa;
}

.music-name{
  font-size:24rpx;
  line-height: 32rpx;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.music-author{
  font-size:24rpx;
  color:#929292;
  line-height: 32rpx;
}
</style>