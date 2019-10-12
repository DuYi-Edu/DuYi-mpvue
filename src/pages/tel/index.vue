<template>
  <div>
    <div class="row">
      <input type="text" class="txt" placeholder="请输入电话号码" @blur="recordTel" />
      <button type="primary" @click="makecallphone" class="subBtn">拨打电话</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userPhone: ""
    };
  },
  methods: {
    //输入框失去光标后的获取输入值
    recordTel(e) {
      this.userPhone = e.target.value;
    },
    //拨打电话
    makecallphone() {
      //从data中获取值,并判断是否有值
      if (this.userPhone != "") {
        //调用wx接口拨打电话
        wx.makePhoneCall({
          phoneNumber: this.userPhone,
          success(res) {
            wx.showToast({
              title: "记得给赞哦",
              icon: "success",
              duration: 1000
            });
          }
        });
      } else {
        wx.showToast({
          title: "记得输入电话号码",
          icon: 'none',
          duration: 1000
        });
      }
    }
  }
};
</script>

<style>
.row{
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    margin-top: 50rpx;
    padding:10rpx;
}
.txt{
    height: 100rpx;
    width: 90%;
    margin: 30rpx 0;
    padding-left: 20rpx;
    background: #ccc;
    border-radius: 20rpx; 
}
</style>