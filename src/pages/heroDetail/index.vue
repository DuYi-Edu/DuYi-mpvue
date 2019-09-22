<template>
  <div class="detail-container">
    <!-- 图片 -->
    <div class="photo-box">
      <img :src="detailHero.photo" alt="imgage" class="img-bg">
    </div>
    <!-- 详情 -->
    <div class="details-info">
      <div class="name">{{detailHero.name}}</div>
      <div class="title">英雄职位；{{detailHero.title}}</div>
      <div class="content">{{detailHero.content}}</div>
    </div>
    <!-- 显示赞 -->
    <div class="zan-box">
      <img src="../../../static/images/zan.png" alt="image" class="zan-icon">
      <span>赞 {{zanCount}}</span>
    </div>
    <!-- 点赞 -->
    <div class="det-btns">
      <button type="primary" @click="tapMe" :loading="loading">点赞</button>
      <button>查看英雄出处</button>
    </div>
     <!-- 点赞成功 -->
    <toast :hidden="toastHidden" duration="500" @change="bindToast">
      点赞成功
    </toast>
  </div>
</template>

<script>
import heroes from '../../utils/request'
export default {
    onLoad(e){
      this.detailHeroId = e.heroid
      this.heroeslist = heroes.herolist
      this.detailHero = this.heroeslist[this.detailHeroId]
      this.zanCount = this.globalData.hero.songjiang
      
    },
    data(){
        return{
          zanCount:0,
          toastHidden:true,
          loading:false,
          detailHeroId:0,
          heroeslist:[],
          detailHero:{}
        }
    },
    methods:{
      tapMe(){
        this.globalData.hero.songjiang=this.globalData.hero.songjiang+1
        this.zanCount = this.globalData.hero.songjiang
        this.toastHidden = false;
        setTimeout(() => {
          this.toastHidden = true;
        }, 1000);
      }
    }
}
</script>

<style>
.img-bg{
  background-color: #eee;
}
.detail-container{
  padding:10rpx;
  font-family:"microsoft yehei"
}
.photo-box{
  display: flex;
  justify-content: center;
  align-items: center;
}
.details-info{
  padding:20rpx;
}
.name{
  font-size:30rpx;
}
.title{
  margin-top:20rpx;
  font-size:28rpx;
  color:chocolate;
}
.content{
  margin-top: 20rpx;
  line-height: 40rpx;
  font-size: 24rpx;
}
.zan-box{
  display: flex;
  padding:20rpx 0;
  align-items: center;
  font-size:28rpx; 
}
.zan-box .zan-icon{
  width:48rpx;
  height: 48rpx;
  margin-right: 20rpx;
}
.det-btns{
  display: flex;
}
</style>