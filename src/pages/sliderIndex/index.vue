<template>
  <div class="page">
      <!-- 侧滑菜单 -->
      <slideBar/>
      <!-- 右边页面 -->
      <div :class="{'page-top':true,'c-state1':open}">
          <img class="top-img" src="/static/images/btn.png" @click="tap_ch" alt="image" >
          <div class="text">旅游游玩</div>
          <!-- 页面 -->
          <div class="item" v-for="item in dataList" :key="index">
              <img :src="item.img" alt="image" class="item-img">
              <div class="item-text">{{item.title}}</div>
          </div>
      </div>
  </div>
</template>

<script>
import requestData from '../../utils/request'
import slideBar from '@/components/slideBar'
export default {
    beforeMount(){
        this.open = false
    },
    onLoad(){
        
    },
    mounted(){
        
    },
    data(){
        return{
            open:false,
            dataList:requestData.data
        }
    },
    components: {
        slideBar
    },
    methods:{
        tap_ch(){
            this.open = !this.open
        }
    }
}
</script>

<style>
.item{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10rpx 0;
    padding-bottom: 20rpx;
    border-bottom: 1rpx solid white;
}
.item .item-img{
    width: 90%;
    height: 300rpx;
}

.item .item-text{
    color: white;
    margin-top: 10rpx;
}
</style>