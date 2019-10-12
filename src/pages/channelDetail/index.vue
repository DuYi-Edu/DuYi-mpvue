<template>
  <div>
    <div class="container">
      <div class="page-section">
        <!-- 台标 -->
        <div class="row">
          <img :src="'/static/images/'+py+'.png'" alt="image" />
          <span class="title">{{currentChannelName}}</span>
        </div>
        <!-- 广告 -->
        <swiper autoplay>
          <block v-for="item in channelAdArr" :key="index">
            <swiper-item>
              <a href="#">
                <img :src="item.imgPath" alt="image" />
              </a>
            </swiper-item>
          </block>
        </swiper>
        <!-- 列表 -->
        <div class="list">
            <div class="row listRow" v-for="item in programList" :key="index">
                <div class="area">
                    <span>{{item.programName}}</span>
                    <span>{{item.playTime}}</span>
                </div>
                <button @click="programInfo" :data-id="index">介绍</button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const db = wx.cloud.database({
  env: "test-jj55w"
});
const channelListObj = db.collection("channelList");
const channelMenuObj = db.collection("channelMenu");
export default {
  onLoad(res) {
    //通过index索引换取名称
    this.getChannelNameById(res.id);
  },
  //每次加载出来都会被执行的生命周期函数
  onShow(){
      //console.log("going")
  },
  data() {
    return {
      //所有频道列表
      channelList: [],
      //当前频道的名称
      currentChannelName: "",
      //当前频道的电视节目列表
      programList: [],
      channelAdArr: [],
      //频道名称的全拼（台标名）
      py:""
    };
  },
  methods: {
    //获取频道列表
    getChannelNameById(channelIndex) {
      var that = this;
      channelListObj
        .get()
        .then(res => {
          this.channelList = res.data;
          this.currentChannelName = res.data[channelIndex].channelName;
          //中文转换拼音操作（获取图片）
          this.getPinyinByName(this.currentChannelName);
          //根据频道名字换取频道列表
          that.getChannelMenuByName(this.currentChannelName);
        })
        .catch(console.error);
    },
    //根据汉字返回拼音
    getPinyinByName(name) {
     var that = this
     //用微信的方式完成数据获取
      wx.request({
        method:"get",
        url: "http://api.k780.com/?app=code.hanzi_pinyin&typeid=1&wd="+name+"&appkey=45584&sign=4de7d2fe8e82e2e213c8c6319318c422&format=json"
,
        success(res) {
          let pyName = res.data.result.ret
          that.py = pyName.trim().split(" ").join("")
        }
      });
    },
    //根据频道的名字获取频道的节目信息菜单
    getChannelMenuByName(currentChannelName) {
      let that = this;
      channelMenuObj
        .where({
          channelName: currentChannelName
        })
        .get()
        .then(res => {
          that.programList = res.data[0].programList;
          that.channelAdArr = res.data[0].channerAD;
        });
    },
    //点击介绍操作事件
    programInfo(e){
      let curProgramObj = this.programList[e.currentTarget.dataset.id]
      //数据全局存储globalData
      this.globalData.programDescripton = curProgramObj
      //跳转
      mpvue.navigateTo({
          url:"/pages/programInfo/main"
      })
    }
  }
};
</script>

<style>
.title {
  font-size: 40rpx;
  font-weight: bold;
}

.page-section {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.row {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 4rpx solid rgb(223, 211, 211);
  height: 100rpx;
  position: relative;
}

.row image {
  width: 80rpx;
  height: 80rpx;
  margin: 10rpx;
}

navigator {
  width: 100%;
  height: 100%;
}

swiper {
  width: 100%;
  height: 400rpx;
}

swiper image {
  width: 100%;
  height: 100%;
}

.area {
  display: flex;
  flex-direction: column;
  margin: 10rpx;
}

.list{
    width: 100%;
}
.listRow{
    width: 95%;
    border-bottom:2rpx solid #ddd;
    margin:20rpx auto;
    padding-bottom:10rpx;
}
button{
    margin-right: 10rpx;
    width:130rpx;
    height: 80rpx;
    font-size:30rpx; 
}
</style>