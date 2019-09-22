<template>
  <div >
      <div class="author-item" v-for="item in authors" :key="index">
          <img :src="item.coverImgUrl" alt="image" class="author-image">
          <div class="author-text">{{item.singer}}</div>
      </div>
  </div>
</template>

<script>
import authorList from '../utils/songs-list'
export default {
    data(){
        return{
            authors: authorList.songslist
        }
    },
    methods:{

    }
}
</script>

<style>
.author-list{
    display: felx;
    flex-direction: cloumn
}
.author-item{
    width:100%;
    height: 80rpx;
    display: flex;
    flex-direction: row;
    padding:10rpx 0;
    align-items: center;
}
.author-image{
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
}
.author-text{
    display: flex;
    align-items: center;
    height: 80rpx;
    border-bottom:1rpx solid #eee;
    padding:6rpx 20rpx;
    flex-grow: 1;
}

</style>