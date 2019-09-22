<template>
  <div class="shz-container">
    <!-- 轮播图 -->
    <div class="swiper-box">
      <swiper
        :indicator-dots="indicatorDots"
        :autoplay="swiperAutoPlay"
        :interval="swiperInterval"
        :duration="swiperDuration"
      >
      <block v-for="item in swiperImgs" :key="index">
        <swiper-item>
          <a href="#">
            <img
              :src="item.src"
              alt="image"
            />
          </a>
        </swiper-item>
      </block>
      </swiper>
    </div>
    <div>
      <!-- 八格按钮 -->
      <div class="flex-box">
        <block v-for="hero in heroes" :key="index">
        <div class="flex-item">
          <a href="#" class="nav-item">
            <div class="inner">{{index+1}}.{{hero.name}}</div>
          </a>
        </div>
        </block>
      </div>
      <!-- 插图 -->
      <div class="pic-box">
          <div class="left-box">
              <img :src="pices[0].src" class="l-pic" alt="image">
          </div>
          <div class="right-box">
              <img :src="pices[1].src" class="r-pic" alt="image">
              <img :src="pices[2].src" class="r-pic" alt="image">
          </div>
      </div>
      <!-- 英雄列表 -->
      <div class="hero-list">

          <div v-for="hero in heroes" class="item" :key="index">
              <div @click="gotoDetail" :data-heroIndex="index">
                  <div class="nav-item">
                      <img :src="hero.photo" alt="image" class="sm-photo">
                      <span class="name">{{index+1}}-{{hero.name}}</span>
                      <img src="../../../static/images/arrowright.png" alt="image" class="arrow-r">
                  </div>
              </div>
          </div>

      </div>
    </div>
  </div>
</template>

<script>
import heros from '../../utils/request'
export default {
  onLoad() {
    this.globalData.hero = {"songjiang":10}
    },
  mounted() {
    this.heroes= heros.herolist
  },
  data() {
    return {
      heroes:[],
      indicatorDots: true,
      swiperAutoPlay: true,
      swiperInterval: 3000,
      swiperDuration: 500,
      swiperImgs:[{
        src:'http://img0.imgtn.bdimg.com/it/u=1097187789,43366287&fm=26&gp=0.jpg'
      },{
        src:'http://img2.imgtn.bdimg.com/it/u=3874550182,2054670776&fm=26&gp=0.jpg'
      },{
        src:'http://pic.baike.soso.com/p/20131212/20131212110545-1954567595.jpg'
      }],
      pices:[{
        src:'http://www.hosane.com/hosane/upload1/picC08121/big/c08121445.jpg'
      },{
        src:"http://img1.imgtn.bdimg.com/it/u=1772389342,3560257393&fm=26&gp=0.jpg"
      },{
        src:"http://pic.baike.soso.com/p/20130628/20130628085301-1920749756.jpg"
      }]
    };
  },
  methods: {
    gotoDetail(heroId){
      //console.log(heroId.currentTarget.dataset.heroindex)
      const url = "/pages/heroDetail/main?heroid="+heroId.currentTarget.dataset.heroindex
      mpvue.navigateTo({url})
    }
  }
};
</script>

<style>
.shz-container {
  width: 100%;
}
.swiper-box {
  width: 100%;
}
.swiper-box img {
  width: 100%;
}
.flex-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background: #eee;
  padding: 20rpx;
}
.flex-item {
  display: flex;
  flex-direction: row;
  margin-bottom: 10rpx;
  border: 1rpx solid #ccc;
  background: #fff;
}
.flex-item .inner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150rpx;
  height: 120rpx;
}
.nav-item {
  display: flex;
  position: relative;
}

/* 插画 */
.pic-box{
    display: flex;
    justify-content: space-around;
    padding:10rpx;
}
.pic-box .left-box{
    flex:1;
    margin-right: 10rpx;
}
.pic-box .right-box{
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    overflow: hidden;
}
.pic-box .l-pic{
    width: 320rpx;
    height: 480rpx;
}
.pic-box .r-pic{
    width:400rpx;
    height: 230rpx;
    background: #ccc;
}

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