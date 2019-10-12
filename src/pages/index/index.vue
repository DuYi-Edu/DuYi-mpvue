<template>
<div>
<div class="banner">
   <img src="/static/images/banner.jpg"/>
</div>
<div class="userinfo">
  <img src="/static/images/tg_tp1.jpg"/>

  <button class='acdd' v-if="!hasUserInfo && canIUse" open-type="getUserInfo" @getuserinfo="getUserInfo"> </button>
  <block v-else>
    <img @click="binddivTap" class="userinfo-avatar" :src="userInfo.avatarUrl" background-size="cover"></img>
  </block>
</div>
<div class='kt'>
  <span>{{txt}}</span>

</div>
<form @submit="formSubmit" @reset="formReset">
  <div class='kt_c'>
    <div>
      <span>姓　　名:</span>
      <input type='text' class='text1' name="name" id="name" :value="name" placeholder=""/>
    </div>
    <div>
      <span>联系方式:</span>
      <input class='text1' maxlength="11" type="number" name="tel" id="tel" :value="tel"/>
    </div>
    <div>
      <span>团 购 码:</span>
      <input class='text1' maxlength="4" type="number" name="age" id="age" placeholder="年龄"/>
    </div>
    <input type="text" hidden="true" name="type" value="团购" />
    <input type="text" hidden="true" name="keshi" value="182" />
    <input type="text" hidden="true" name="xcx_link" value="tuangou.com" />

  </div>
  <div class='kt_btn'>
    <button class='button01' @click="aaa" form-type="submit">提交</button>
  </div>
</form>
<!-- 大图片 -->
<div class="tit1">
  <img src="/static/images/tit1.png" alt="image"/>
</div>
<div class="jklb">
  <block v-for="item in imagesArr" :key="index">
    <lanmu :imgsrc="item.img" @tapclick="lanmuClcik"/>
  </block>
</div>
<div>
  <img src="/static/images/tit2.png" alt="" mode="widthFix">
</div>

<div class="hdgz">
  <div>
    <span>01</span>
    活动礼包只做抵扣使用，不找零、不兑现、并不与其他优惠活动重叠使用；
  </div>
  <div>
    <span>02</span>
    用户可邀请好友拼团抢购0元 肝脏检查套餐，套餐包括乙 肝两对半、丙肝抗体、肝功能、彩超；满2人即可成团。
  </div>
  <div>
    <span>03</span>
    其他健康礼包可单人抢购
  </div>
  <div>
    <span>04</span>
    申请抢购的用户，将在24小时内接到在线客服的回访，确 认用户使用礼包的日期，以及详细使用细则。
  </div>
  <div>
    <img src="/static/images/foot_tp.jpg" alt="image">
  </div>
</div>



</div>
  
</template>
<script>
import images from '@/utils/data'
import lanmu from '@/components/lanmu'
export default {
  data() {
    return {
      name:"张三",
      userInfo:{},
      hasUserInfo:false,
      imagesArr:images.imgs
    };
  },

  components: {
    lanmu
  },

  methods: {
    //组件lanmu映射出来的事件处理
   lanmuClcik(){
     //拨打电话
     wx.makePhoneCall({
       phoneNumber:'13876567876'
     })
   },
   //表单的提交
    formSubmit(e){
      //console.log(e)
      //用户数据的判别
      let formData = e.target.value
      if(formData.name == ''){
        wx.showToast({
          title:"请输入名称",
          icon:'none',
          duration:1000
        })
      }else if(formData.tel == ""){
        wx.showToast({
          title:"请输入电话",
          icon:'none',
          duration:1000
        })
      }else if(formData.tel.length != 11){
        wx.showToast({
          title:"手机长度为11位",
          icon:'none',
          duration:1000
        })
      }else{
        //数据提交
        let _url = "https://call.hylink2.com/Home/Index/xcx"
        wx.request({
          url:_url,
          data:formData,
          header:{
            'Content-Type':'application/json'
          },
          success:res=>{
            //console.log(res)
            if(res.data){
              wx.showToast({
                title:"参团成功",
                icon:'success',
                duration:1000
              })
              //跳转
              mpvue.navigateTo({
                url:'/pages/logs/main'
              })
            }
          }
        })
      }
    }
  },
  created() {
    if(this.globalData.userInfo){
      this.userInfo = this.globalData.userInfo
      this.hasUserInfo = true
    }else{
      //用户登录操作
      wx.getUserInfo({
        success:res=>{
          this.globalData.userInfo = res.userInfo
          this.userInfo = res.userInfo
          this.hasUserInfo = true
          console.log(this.globalData.userInfo)
        }
      })
    }
  }
};
</script>

<style scoped>



.banner {
  overflow: hidden;
  width: 750rpx;
  height: 375rpx;
}

.banner img{
  height: 375rpx;
}

.kt {
  overflow: hidden;
  padding: 10rpx 0 20rpx;
  font-size: 20rpx;
  line-height: 34rpx;
}
.acdd {
  border-radius: 100%;
  width: 105rpx;
  height: 107rpx;
  border: 0;
  background: none;
  padding: 0;
  margin: 0;
  background: url(http://weixin.hengyitz.com/imgs/hnyygb/tg_tp2.jpg) no-repeat;
  background-size: 100%;
}
.kt span {
  display: block;
}

.kt_btn {
  margin: 28rpx auto 44rpx;
  width: 318rpx;
  height: 50rpx;
}

.kt_btn button {
  border-radius: 30rpx;
  background: #d2070a;
  color: #fff;
  font-size: 24rpx;
}


.kt_c {
  width: 540rpx;
  margin: 0 auto;
  overflow: hidden;
  height: 85rpx;
  font-size: 24rpx;
  color: #333;
}

.kt_c>div:nth-of-type(1) {
  float: left;
  width: 255rpx;
}

.kt_c>div:nth-of-type(2) {
  float: right;
  width: 260rpx;
}
.kt_c>div:nth-of-type(3) {
  float: left;
  width: 260rpx;
}

.input-placeholder {
  font-family: "Microsoft YaHei";
  color: #333;
}


.kt_c>div input.text1 {
  width: 140rpx;
  border-bottom: #ccc 1rpx solid !important;
  display: block;
  height:30rpx;
  min-height: 30rpx;
  line-height: 30rpx;
  float: right;
}

.kt_c>div text {
  float: left;
  line-height: 40rpx;
 display: block;
}

.tit1 {
  overflow: hidden;
  width: 750rpx;
  height: 165rpx;
}

.tit1 img {
  height: 165rpx;
}

.jklb {
  overflow: hidden;
}



.hdgz {
  overflow: hidden;
  padding: 0px 40rpx 30rpx;
}

.hdgz>div {
  padding: 14rpx 0;
  font-size: 24rpx;
  line-height: 40rpx;
  color: #333;
  border-bottom: #ccc 1rpx dotted;
}

.hdgz>div span {
  display: inline-block;
  color: #fff;
  text-align: center;
  width: 38rpx;
  height: 38rpx;
  margin: 10rpx 10rpx 10rpx 0;
  background: #cf060b;
  border-radius: 50%;
}

.hdgz>div:last-of-type {
  border-bottom: none;
}
.userinfo {
   display: flex;
    flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
   overflow: hidden;
   padding: 48rpx 0 20rpx;
}
.userinfo image{ display: inline-block; width: 105rpx; height: 107rpx; margin: 0rpx 19rpx;}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 200px;
}

.jklb div {
  float: left;
  width: 375rpx;
}
.jklb div img{ vertical-align: top; width: 375rpx;}

</style>
