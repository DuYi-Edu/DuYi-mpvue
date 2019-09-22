<template>
  <div>
  <scroll-view scroll-x class="scroll">
    <div class="scroll-div">
      <a href="/pages/form/main">国内新闻</a>
      <a href="/pages/form/main">国际新闻</a>
      <a href="/pages/form/main">国内新闻</a>
      <a href="/pages/form/main">国际新闻</a>
      <a href="/pages/form/main">国内新闻</a>
      <a href="/pages/form/main">国际新闻</a>
    </div>
  </scroll-view>

    <swiper autoplay @change="swiperChange" class="swiper-style">
      <swiper-item>
        <a href="/pages/form/main" target="_self">
        <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3762095652,4288929885&fm=26&gp=0.jpg" alt="image"/>
        </a>
      </swiper-item>
      <swiper-item> 
        <navigator url="/pages/form/main" open-type="navigate">
          <image src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4278070400,582818240&fm=26&gp=0.jpg"></image>
        </navigator>
        <!-- <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4278070400,582818240&fm=26&gp=0.jpg" alt="image"> -->
      </swiper-item>
    </swiper>

    <div v-for="item in newsList" :key="index">
      <customNews :newsTitle="item.newsTitle" :newsImg="item.newsImg"></customNews>
    </div>

    <map id="map" longitude="113.324520" latitude="23.099994" scale="14" :controls="controls" bindcontroltap="controltap" :markers="markers" bindmarkertap="markertap" :polyline="polyline" bindregionchange="regionchange" show-location style="width: 100%; height: 300px;"></map>

  </div>
</template>

<script>
import customNews from '@/components/news';
const MOVIE_URL = "http://t.yushu.im/v2/movie/top250"

export default {
  data() {
    return {
      newsList:[
        {newsTitle:"今天，韩国正式将日本移出贸易“白名单”",newsImg:"https://imgsa.baidu.com/news/q%3D100/sign=f911b3b2057b02080ac93be152d9f25f/242dd42a2834349b942cf592c6ea15ce36d3befb.jpg"},
        {newsTitle:"工博会，机器人弹钢琴",newsImg:"https://imgsa.baidu.com/news/q%3D100/sign=8ccd4403b799a9013d355f362d940a58/1b4c510fd9f9d72af3a4880adb2a2834359bbbe1.jpg"}
      ],
      polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color:"#FF0000DD",
      width: 2,
      dottedLine: true
    }],
      markers: [{
      iconPath: "/resources/others.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
      controls: [{
      id: 1,
      iconPath: '/resources/location.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
    };
  },
  methods: {
    swiperChange(e){
      console.log(e)
    }
  },
  components:{
    customNews
  }
};
</script>

<style>
.swiper-style img,.swiper-style image{
  width: 100%;
}
.scroll{
  width: 100%;
  background-color:bisque;
  height: 60rpx;
}

.scroll-div{
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  align-items: center;
  line-height: 60rpx;
}

.scroll-div navigator{
  margin: 0 20rpx;
}
</style>