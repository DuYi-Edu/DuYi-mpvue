<template>
  <div class="hero-list">
      <div v-for="hero in heroes" class="item" :key="index">
           <a href="#">
                  <div class="nav-item">
                      <img :src="hero.photo" alt="image" class="sm-photo">
                      <span class="name">{{index+1}}-{{hero.name}}</span>
                      <img src="../../../static/images/arrowright.png" alt="image" class="arrow-r">
                  </div>
              </a>
      </div>
  </div>
</template>

<script>
import heroes from '../../utils/request'
export default {
    mounted(){
        this.heroes = heroes.heroes
    },
    data(){
        return{
            heroes:[]
        }
    },
    methods:{

    }
}
</script>

<style>
/* 英雄列表 */
.hero-list{
    width: 100%;
}
.hero-list .item{
    border-bottom:2rpx solid #eee;
}
.hero-list .nav-item{
    position: relative;
    display: flex;
    height: 80rpx;
    padding:20rpx;
    align-items: center;
    justify-content: space-between;
}
.hero-list .item .sm-photo{
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    margin-right: 40rpx;
}
.hero-list .item .arrow-r{
    width: 32rpx;
    height: 32rpx;
}
.hero-list .item .name{
    flex: 1;
    font-size: 32rpx;
}
</style>