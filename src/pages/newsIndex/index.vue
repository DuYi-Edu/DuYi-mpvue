<template>
  <div>
    <!-- 轮播图 -->
    <div>
      <swiper
        :autoplay="autoplay"
        :interval="interval"
        :duration="duration"
        :indicator-dots="indicatorDots"
        class="banners"
      >
        <block v-for="item in banners" :key="index">
          <swiper-item class="banner">
            <img class="banner-image" :src="item.image" alt="image" />
            <div class="banner-title">{{item.title}}</div>
          </swiper-item>
        </block>
      </swiper>
    </div>
    <!-- 新闻列表 -->
    <div class="news-item-container">
      <div>今日新闻</div>
      <block v-for="item in list" :key="index">
        
        <div @click="showNewsInfo" :data-newsid="item.id">
          <div class="news-item">
            <div class="news-item-left">
              <div class="news-item-title">{{item.title}}</div>
            </div>
            <div class="news-item-right">
              <img class="news-image" :src="item.images[0]" alt="image" />
            </div>
          </div>
        </div>
      </block>
      <!-- 继续加载 -->
      <button :loading="loading" class="load-btn" type="primary" size="mini" @click="loadMore">更多</button>
    </div>
  </div>
</template> 
 
<script>
import utils from '../../utils/index'
const ZHIHUNEWS_URL = "http://news-at.zhihu.com/api/4/news/latest"
export default {
  //生命周期
  mounted() {
    this.$fly
      .request({
        method: "get",
        url: ZHIHUNEWS_URL,
        body: {}
      })
      .then(res => {
        console.log(res);
        (this.banners = res.data.top_stories), (this.list = res.data.stories);
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    return {
      banners: [],
      list: [],
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 800,
      index: 1,
      loading: false
    };
  },
  methods: {
    //新闻详情页的跳转
    showNewsInfo(e){
      //跳转模式使用微信的写法
      console.log(e.currentTarget.dataset.newsid)
      wx.navigateTo({
        url:"/pages/newsinfo/main?newsid="+e.currentTarget.dataset.newsid
      })
      
    },
    
    loadMore() {
      if (this.list.length == 0) return;
      let date = this.getNextDate();
      //按钮改变为loading状态
      this.loading = true;
      const NEWS_BEFORE = "http://news.at.zhihu.com/api/4/news/before/"
      let now = Number(utils.formateData(date))+1
      
      console.log(NEWS_BEFORE+now)
      //数据加载
      this.$fly
        .request({
          method: "get",
          url: NEWS_BEFORE+now,
          body: {}
        })
        .then(res => {
          console.log(res);
          this.list = this.list.concat(res.data.stories)
          this.loading=false

        })
        .catch(err => {
          console.log(err);
        });
        
    },
    getNextDate() {
      let now = new Date();
      now.setDate(now.getDate() - this.index++);
      return now;
    }
  }
};
</script>

<style>
.banners {
  width: 100%;
  height: 400rpx;
}

.banner {
  position: relative;
}

.banner-image {
  width: 100%;
  height: 100%;
}

.banner-title {
  color: #fff;
  position: absolute;
  width: 100%;
  padding-left: 32rpx;
  padding-right: 32rpx;
  bottom: 60rpx;
  font-size: 32rpx;
  left: 0;
}

.news-item-container {
  background-color: #f2f2f2;
  width: 100%;
  padding-left: 16rpx;
  padding-right: 16rpx;
  margin-left: -8rpx;
}

.news-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16rpx;
  margin: 16rpx 16rpx 0 0;
  background-color: #fff;
  border: 2rpx solid gray;
  border-bottom: 2rpx solid #ccc;
  border-radius: 10rpx;
}

.news-item-right {
  width: 160rpx;
  height: 160rpx;
}

.news-image {
  width: 160rpx;
  height: 160rpx;
}

.news-item-title {
  font-size: 32rpx;
}

.load-btn {
  margin: 32rpx 16rpx;
}
</style>