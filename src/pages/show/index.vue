<template>
  <div>
    <div class="container">
      <div class="container-content">
        <div class="user-info">
          <img class="user-head" :src="showData.user.avatarUrl" alt="image" />
          <div class="user-name-time">
            <div class="user-name">{{showData.user.nickName}}</div>
            <div class="user-public-time">{{showData.data}}</div>
          </div>
        </div>
        <!-- 显示内容 -->
        <div class="content">
          <span class="content-text">{{showData.content}}</span>
          <scroll-view class="content-scroll" scroll-x>
            <block v-for="item in showData.images" :key="index">
              <img :src="item" alt="image" @click="saveImageToPhotoAlbum" :data-img="item"/>
            </block>
          </scroll-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    onShow(){
        this.showData = this.globalData.content.data[0]
    },
    data(){
        return{
            showData:{}
        }
    },
    methods:{
        //存储图片到本地
        saveImageToPhotoAlbum(e){
            wx.saveImageToPhotosAlbum({
                filePath:e.currentTarget.dataset.img,
                success(res){
                    wx.showToast({
                        title:"存储成功",
                        icon:"success",
                        duration:2000
                    })
                }
            })
        }
    }
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #ccc
}

.container-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px 16px;
  margin: 0 auto;
}

.user-info {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
}

.user-head {
  width: 72rpx;
  height: 72rpx;
  line-height: 72rpx;
  border-radius: 50%;
  background: #ccc;
}

.user-name-time {
  width: 80%;
  margin-top: 10rpx;
  margin-left: 20rpx;
}

.user-name {
  font-size: 36rpx;
  color: #333;
  font-weight: bold;
}

.user-publish-time {
  font-size: 30rpx;
  color: #999;
}

.content {
  display: flex;
  flex-direction: column;
  margin-left: 5%;
  margin-top: 28rpx;
}

.content-scroll {
  display: felx;
  flex-direction: row;
  width: 100%;
  white-space: nowrap;
}

.content-text {
  font-size: 36rpx;
  color: #666;
  margin-left: 20rpx;
}

.content-img {
  width: 200rpx;
  height: 200rpx;
  margin-left: 20rpx;
  margin-top: 20rpx;
  background: #999;
}
</style>