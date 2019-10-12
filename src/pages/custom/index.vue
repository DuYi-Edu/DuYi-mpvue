<template>
  <div class="container">
    <dir class="inner">
      <form @submit="save">
        <!-- to name -->
        <div class="item">
          <span class="key">对方称呼</span>
          <input type="text" name="toname" class="value" @blur="setToName"  :value="wishes.toName"/>
        </div>
        <!-- from name -->
        <div class="item">
          <span class="key">祝福落款</span>
          <input
            type="text"
            name="nickName"
            class="value"
            :value="userInfo.nickName"
            @blur="setNickName"
          />
        </div>
        <!-- best wishes -->
        <div class="item best-wishes">
          <textarea maxlength="50"  name="bestWishes" id="bestWishes" @input="setFont" class="textarea" :value="wishes.sentence"></textarea>
          <span class="word-tips">50字以内</span>
        </div>
        <!-- select panel text -->
        <div class="select-panel">
          <button class="tips" plain="true" hover-class="tapped" @click="moreTemplate">
            <span>选择其他推荐祝福语</span>
            <img class="bg" src="/static/images/indicator.png" alt="image" />
          </button>
        </div>
        <!-- controls save -->
        <div class="btns">
          <button form-type="submit" class="save-btn" hover-class="hover-btn">保存</button>
        </div>
      </form>
    </dir>
  </div>
</template>

<script>
export default {
  //生命週期函數
  onLoad(){
    //从全局对象中获取数据
    this.userInfo = this.globalData.userInfo
    this.wishes = this.globalData.wishesInfo

    console.log('userInfo',this.userInfo)
    console.log('wishes',this.wishes)
  },
  data() {
    return {
      //用户信息
      userInfo:{},
      //祝福（关系，性别，称呼）
      wishes:{},
      fontLen:0
    };
  },
  methods: {
    //祝福语模板跳转
    moreTemplate(){
      mpvue.navigateTo({
        url:"/pages/more/main"
      })
    },
    setFont(e){
      //this.fontLen = e.target.value.length
    },
    //动态改变称呼
    setToName(e){
      //冲突注意：如果是自行输入操作，此方法可行，如果是全局的赋值或其他页面的修改影响，就不能使用input来计算长度
      //console.log(e.target.value)
      this.wishes.toName = e.target.value
    },
    setNickName(e){
      console.log(e.target.value)
      this.userInfo.nickName = e.target.value
    },
    //用户表单提交时的事件
    save(e){
      //将祝福语存入wishes
      this.wishes.sentence = e.target.value.bestWishes
      //console.log(this.wishes)
      //存入全局变量
      this.globalData.wishesInfo =this.wishes
      //回跳到之前页面
      wx.navigateBack()
    }
  }
};
</script>

<style>
.container {
  background-color: #f7f4ee;
}
.inner {
  padding: 20rpx 0;
  position: relative;
  top: 0;
  height: 100%;
  transition: all ease-in 100ms 0ms;
}
.mask {
  background: rgba(0, 0, 0, 0.48);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: none;
}
.item {
  height: 90rpx;
  border-top: 1rpx solid #e0e0e0;
  border-bottom: 1rpx solid #e0e0e0;
  background-color: #fff;
  padding: 0 30rpx;
  font-size: 34rpx;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}
.item + .item {
  margin-top: 20rpx;
}
.item .key {
  color: #424242;
  margin-right: 20rpx;
  width: 136rpx;
}
.item .value {
  flex: 1;
  color: #888;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.best-wishes {
  position: relative;
  height: 282rpx;
  padding-top: 30rpx;
  padding-bottom: 30rpx;
  box-sizing: border-box;
}
.best-wishes textarea {
  width: 100%;
  height: 100%;
  line-height: 48rpx;
  font-size: 34rpx;
  color: #424242;
  text-align: justify;
}
.word-tips {
  position: absolute;
  bottom: 20rpx;
  right: 30rpx;
  font-size: 28rpx;
  color: #b2b2b2;
}
.red {
  color: #e7404d;
}
.btns {
  margin-top: 40rpx;
  display: flex;
  justify-content: center;
}
.btns button {
  padding: 0;
  line-height: 0;
  width: 230rpx;
  line-height: 70rpx;
  font-size: 36rpx;
  font-weight: bold;
  color: #d9ba6a;
  border: 3rpx solid #d9bad9;
  border-radius: 10rpx;
  margin-left: 0;
  margin-right: 0;
  background-color: transparent;
}
.btns button.hover-btn {
  border: none;
  background-color: #d9ba6a;
  color: #fff;
}
.select-panel .tips {
  font-size: 32rpx;
  color: #e7404d;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 330rpx;
  padding: 0;
  border: none;
}
.tapped {
  opacity: 0.7;
}
.select-panel .tips .bg {
  width: 15rpx;
  height: 27rpx;
  margin-left: 10rpx;
}
</style>