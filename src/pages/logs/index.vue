<template>
  <div class="container">
    <div class="inner">
      <!-- 祝福面板 -->
      <div class="wishes-panel">
        <img src="/static/images/wishes-panel.png" alt="image" class="bg" />
        <!-- 祝福卡片 -->
        <div @click="bindViewTap">
          <div class="userinfo">
            <img :src="userInfo.avatarUrl" alt="image" class="userinfo-avatar" />
          </div>
          <div class="to-name">
            <span>祝{{wishes.toName}}</span>
          </div>
          <div class="best-wishes">
            <span>{{sentence}}</span>
          </div>
          <div class="from-name">
            <span>{{userInfo.nickName}}</span>
          </div>
          <div class="date">
            <span>{{today}}</span>
          </div>
        </div>
      </div>
      <!-- btns -->
      <div class="btns">
        <button class="change-btn" @click="changeOne">换一个</button>
        <button class="finish-btn" @click="shareTips">送祝福</button>
      </div>
    </div>
    <!-- copy right -->
    <div class="copy-right">
      <span>--腾讯网产品中心出品--</span>
    </div>

    <!-- 覆盖提示 -->
    <div class="overlay center" @click="confirmCustomHint" v-if="!showCustomHint">
      <div class="overlay-inner">
        <div class="center-block">
          <img src="/static/images/tap.png" alt="image" class="hand" />
          <span>点击卡片文本可以编辑祝福信息</span>
        </div>
        <button hover-class="btn-hover">我知道了</button>
      </div>
    </div>
    <!-- 分享 -->
    <div class="overlay" v-if="showOverlay">
      <img src="/static/images/share-tips.png" alt="image" class="tips">
    </div>
  </div>
</template>

<script>
import wishList from '@/utils/data'
export default {
  data() {
    return {
      sentence:'',
      wishes: {},
      //globalData全局对象不能直接在data中赋值
      userInfo: {},
      toname: "",
      today: this.today(),
      showCustomHint: false,
      showOverlay:false
    };
  },
  onShow() {
    this.userInfo = this.globalData.userInfo
    //接受全局对象数据
    this.wishes = this.globalData.wishesInfo
    this.sentence = this.wishes.sentence
    console.log("onShow",this.wishes)
  },
  //分享事件,被动唤起
    onShareAppMessage(){
      return{
        title:`${this.globalData.userInfo.nickName}给您发来祝福`,
        desc:"您也可以制作祝福话",
        path:'/pages/index/main'
      }
    },
  methods: {
    //送祝福
    shareTips(){
      this.showOverlay = true
      setTimeout(()=>{
        this.hideOverlay()
      },1500)
    },
    hideOverlay(){
      this.showOverlay = false
    },
    //祝福内容的制作
    bindViewTap() {
      //跳转
      mpvue.navigateTo({
        url: "/pages/custom/main"
      });
    },
    //用户提示文本确认事件
    confirmCustomHint() {
      //改变showCustomHint
      this.showCustomHint = true;
    },
    //当前时间
    today() {
      let year, month, day;
      let date = new Date();
      year = date.getFullYear();
      month = this.formatNumber(date.getMonth() + 1);
      day = this.formatNumber(date.getDate());
      return `${year}年${month}月${day}日`;
    },

    formatNumber(n) {
      n = n.toString();
      return n[1] ? n : "0" + n;
    },
    //点击换一个
    changeOne() {
      //获取祝福列表
      let wihsListArr = wishList.sentence
      //随机选择一条(长度为whisListArr)的范围内
      //公式 1-5 ： Math.floor((Math.random()*5)+1)
      let index = Math.floor((Math.random()*wihsListArr.length)+0)
      //这条替换wishesInfo.sentence
      //console.log(' whisListArr[index].content',whisListArr[index].content)
      this.globalData.wishesInfo.sentence = wihsListArr[index].content
      this.wishes = this.globalData.wishesInfo
      this.sentence = wihsListArr[index].content
      console.log('this.wishes',this.wishes)
      
    },
    //获取用户信息
    getUserInfo() {
      wx.getUserInfo({
        success: res => {
          console.log(res);
          this.globalData.userInfo = res.userInfo;
        }
      });
    }
  },

  created() {
    this.getUserInfo();
  }
};
</script>

<style>
.container {
  height: 100%;
  position: relative;
  background: #e7404d;
  background: linear-gradient(to bottom, #e7404d 70%, #cc3944);
}
.inner {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.wishes-panel {
  position: relative;
  width: 460rpx;
  height: 754rpx;
  padding: 132rpx 113rpx 0;
  font-size: 34rpx;
  color: #424242;
}
.wishes-panel .bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.userinfo {
  position: relative;
  display: flex;
  justify-content: center;
  height: 180rpx;
}
.userinfo-avatar {
  width: 180rpx;
  height: 180rpx;
  border-radius: 50%;
}
.to-name {
  position: relative;
  margin-top: 60rpx;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.best-wishes {
  position: relative;
  width: 100%;
  margin-top: 30rpx;
  text-align: justify;
  height: 180rpx;
  overflow: hidden;
  line-height: 45rpx;
}
.from-name {
  position: relative;
  margin-top: 30rpx;
  text-align: right;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.date {
  position: relative;
  font-size: 28rpx;
  text-align: right;
}

.btns {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 686rpx;
  padding: 30rpx 65rpx 0;
}
.btns button {
  width: 294rpx;
  height: 88rpx;
}
.btns button::after {
  display: none;
}
.btns .change-btn {
  color: #e8c478;
  border: 3rpx solid #e8c478;
  background-color: #d93c48;
}
.btns .finish-btn,
.btns .share-btn,
.btns .custom-btn {
  color: #fff;
  border: 3rpx solid #e8c478;
  background-color: #e8c478;
  line-height: 88rpx;
}
.btns .button-hover {
  opacity: 0.6;
}
.copy-right {
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 26rpx;
  color: #fff;
  opacity: 0.6;
  margin-top: 30rpx;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}
.overlay .tips {
  position: absolute;
  top: 30rpx;
  right: 35rpx;
  width: 589rpx;
  height: 164rpx;
  z-index: 2;
}
.overlay.center {
  display: flex;
  justify-content: center;
}
.btn-hover {
  opacity: 0.6;
}
.overlay-inner button {
  width: 260rpx;
  background-color: transparent;
  margin-top: 60rpx;
  border: 6rpx solid #d9ba6a;
  border-radius: 12rpx;
  color: #d9ba6a;
  font-size: 34rpx;
}
.center-block {
  position: relative;
  margin-top: 360rpx;
  box-sizing: border-box;
  width: 568rpx;
  height: 390rpx;
  border: 6rpx dashed #d9ba6a;
  border-radius: 10rpx;
  color: #fff;
  font-size: 34rpx;
  text-align: center;
  padding-top: 232rpx;
}

.center-block .hand {
  position: absolute;
  top: 105rpx;
  left: 50%;
  width: 74rpx;
  height: 88rpx;
  margin-left: -35rpx;
}

</style>
