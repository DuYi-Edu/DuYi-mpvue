<template>
  <div class="container">
    <!-- 轮播图 -->
    <swiper
      class="banners"
      :indicator-dots="indicatorDots"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
    >
      <block v-for="item in imgUrls" :key="index">
        <swiper-item class="banner">
          <navigate url="#">
            <img class="banner-image" :src="item.imgUrl" alt="image" />
          </navigate>
        </swiper-item>
      </block>
    </swiper>

    <!-- 课堂信息列表 -->
    <div class="items-container">
      <block v-for="item in list" :key="index">
        <!-- 需要判断type类型的值（1，类别 2,3,4显示-->
        <div v-if="item.type === 1" class="item-type1">
          <type1 :itemdata="item.data" />
        </div>
        <a v-else-if="item.type === 2" :href="'/pages/default/main?id='+item.data.id">
          <type2 :datatitle="item.data.title" :dataimg="item.data.imgUrl" />
        </a>
        <!-- 判断type为3的排版 -->
        <a :href="'/pages/default/main?id='+item.data.id" v-else-if="item.type === 3">
          <type3
            :dataimg="item.data.imgUrl"
            :datatitle="item.data.title"
            :datasummary="item.data.summary"
          />
        </a>
        <!-- 判断type类型为4 -->
        <div v-else-if="item.type===4">
          <type4
            :imgurl0="item.data[0].imgUrl"
            :imgurl1="item.data[1].imgUrl"
            :articleid0="item.data[0].articleId"
            :articleid1="item.data[1].articleId"
          />
        </div>
      </block>
    </div>
  </div>
</template>

<script>
import type1 from "@/components/type1";
import type2 from "@/components/type2";
import type3 from "@/components/type3";
import type4 from "@/components/type4";

export default {
  //微信下拉刷新事件
  onPullDownRefresh() {
    this.loadData();
  },
  //生命周期函数(微信)
  onLoad() {
    //初始化获取显示数据
    this.loadData();
  },
  data() {
    return {
      //轮播图数组
      imgUrls: [],
      //显示列表数组
      list: [],
      //轮播图的点参数
      indicatorDots: true,
      autoplay: true,
      interval: 2000,
      duration: 500
    };
  },

  components: {
    type1,
    type2,
    type3,
    type4
  },

  methods: {
    //type==3时的事件点击
    bannerImageTap(e) {
      console.log(e);
    },
    //获取初始数据
    loadData() {
      //微信网络api接口
      let _url = "http://z.yeemiao.com/mm/api/article/get-popular-data";
      wx.request({
        url: _url,
        data: {},
        method: "POST",
        header: { "Content-Type": "application/json" },
        success: res => {
          //console.log(res)
          //定义临时变量(需要把接口的所有数据转换格式后存储)
          let tempArray = new Array();
          //获取所有显示项的数组
          let resArray = res.data.data.items;
          //获取显示项数组的长度
          let length = resArray.length;
          //循环
          resArray.forEach((item, index) => {
            //获取当前的数据对象
            let _resData = resArray[index].data;
            if (item.type != 1) {
              //非标题item
              _resData = JSON.parse(resArray[index].data);
            }
            //添加到临时数组tempArray
            tempArray[index] = {
              type: resArray[index].type,
              data: _resData
            };
          });
          //设置data数据
          (this.imgUrls = res.data.data.banners), (this.list = tempArray);
          console.log(this.list);
          //停止下拉刷新
          wx.stopPullDownRefresh();
        }
      });
    }
  },

  created() {}
};
</script>

<style>
page {
  width: 100%;
  height: 100%;
}
.banner {
  position: relative;
}
.banners {
  width: 100%;
  height: 320rpx;
}
.banner-image {
  width: 100%;
  height: 100%;
}

.items-container {
  width: 100%;
}

.item-type4 {
  background: white;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 170rpx;
}
</style>
