<template>
  <div>
      <div class="container flex-wrap flex-direction-col">
          <!-- 广告宣传 -->
          <div class="my-swiper">
              <swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
                <block v-for="item in imgUrls" :key="index">
                    <swiper-item>
                    <img :src="item.imagePath" alt="image" height="200">
                    </swiper-item>
                </block>
              </swiper>
          </div>
          <!-- 分类导航 -->
          <div class="nav-block wrap">
              <block v-for="item in navItems" :key="index">
                  <div :class="{'wrap-item':true,'exp':item.isSplot}">
                      <a :href="'/pages/'+item.url+'/main'">{{item.name}}</a>
                  </div>
              </block>
          </div>
          <!-- 新品上架 -->
          <div class="text">
              <div class="line-flag"></div>
              <span>新品上架</span>
          </div>
          <div class="venues_box">
              <div class="venues_list">
                  <block v-for="item in venuesItems" :key="index">
                      <div class="venues_item">
                          <img :src="item.imgurl" alt="image">
                      </div>
                  </block>
              </div>
          </div>
          <!-- 会员反馈 -->
          <div class="text">
              <div class="line-flag"></div>
              <span>会员反馈</span>
          </div>
          <div class="choice_box">
              <div class="choice_list">
                  <block v-for="item in choiceItems" :key="index">
                      <div class="choice_item">
                          <img :src="item.imgurl" alt="image"/>
                          <div class="title">{{item.title}}</div>
                      </div>
                  </block>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import dataList from "@/utils/data"
export default {
    data(){
        return{
            imgUrls:dataList.imags,
            indicatorDots:true,
            autoplay:true,
            interval:5000,
            duration:500,
            navItems:dataList.navItems,
            venuesItems:dataList.venuesItems,
            choiceItems:dataList.choiceItems
        }
    },
    methods:{

    }
}
</script>

<style>
.flex-wrap{
    display: flex;
}
.flex-direction-col{
    flex-direction: column
}
.my-swiper,.my-swiper img{
    width: 100%;
}

.wrap{
    display: inline-block;
    margin-top: 20rpx;
}
.wrap-item{
    display: inline-block;
    width: 33%;
    height: 160rpx;
    line-height: 160rpx;
    border:1rpx solid #ddd;
    background-color: #fff;
    text-align: center;
}
.exp{
    color: red;
}

.venues_box{
    padding:0 10rpx;
}

.venues_item{
    display: inline-block;
    width:49%;
    margin:0,0.5%;
}

.venues_item img{
    width: 100%;
    height: 180rpx;
}
.line-flag{
    width:10rpx;
    height: 30rpx;
    display: inline-block;
    margin-top: 20rpx;
    margin-inline-start: 20rpx;
    background-color: #f9f027;
}

.text{
    margin: 10rpx 0;
}

view.text span{
    margin-left: 20rpx;
    line-height: 36rpx;
    font-weight: bold;
}

.choice_box{
    padding:  0 10rpx;
}

.choice_box .choice_list .choice_item{
    margin-bottom:30rpx;
}

.choice_box .choice_list img{
    width: 100%;
    height: 400rpx;
}
.choice_box .choice_list .title{
    font-size:24rpx;
    font-weight: bold;
    text-align: center;
    color:#333;
}
</style>