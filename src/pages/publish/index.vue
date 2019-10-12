<template>
  <div>
      <div class="content">
          <form @submit="formsubmit">
              <div class="text-content">
                  <!-- 用户发表言论内容 -->
                  <div class="text-area">
                      <textarea name="inputcontent" placeholder="说点什么吧..."></textarea>
                  </div>                 
              </div>
              <!-- 图片预览区域 -->
              <scroll-view class="image-group" scroll-x>
                  <div v-for="item in images" :key="index">
                      <img :src="item" alt="image">
                      <!-- 删除图片 -->
                      <icon type="clear" @click="removeImg" :data-index="index"></icon>
                  </div>
              </scroll-view>
              <!-- 按钮区 -->
              <div class="btn-func">
                  <button class="btn-img" @click="chooseImage">选择图片</button>
                  <button class="btn" form-type="submit" open-type="getUserInfo">记录信息</button>
              </div>
          </form>
      </div>

  </div>
</template>

<script>
export default {
    data(){
        return{
            user:{},//用户信息
            content:'',//用户输入信息
            images:[],//图片信息
            canIUse:wx.canIUse("button.open-type.getUserInfo")
        }
    },
    //生命周期-初始化
    onLoad(){
        //获取用户个人数据
        this.getUserLogin()
        //初始化global变量
        this.globalData.content = {data:[]}
    },
    methods:{
        //删除临时图片
        removeImg(e){
            let position = e.currentTarget.dataset.index
            // 删除图片
            this.images.splice(position,1)
        },
        //得到用户的登录
        getUserLogin(){
            var that = this
            wx.getSetting({
                success(res){
                    if(res.authSetting['scope.userInfo']){
                        //已经授权，可以直接调用getUserInfo获取数据
                        wx.getUserInfo({
                            success(res){
                                that.user = res.userInfo
                            }
                        })
                    }
                }
            })
        },
        //表单提交
        formsubmit(e){
            this.content = e.target.value.inputcontent
            //数据存储
            if(this.canIUse){
                //有权限
                if(this.images.length>0 || this.content!=""){
                    //有数据
                    this.saveData()
                    
                }else{
                    //无数据提示
                    wx.showToast({
                        title:'写点东西吧',
                        icon:'none'
                    })
                }
            }
        },
        //数据保存
        saveData(){
            let data={
                content:this.content,
                date:new Date(),
                images:this.images,
                user:this.user
            }
            this.globalData.content.data.push(data)

            mpvue.navigateTo({
                url:"/pages/show/main"
             })
        },
        // 选择图片
        chooseImage(){
            var that = this
            // sizeType: original原图 compressed压缩图
            wx.chooseImage({
                count:3,
                sizeType:["original",'compressed压缩图'],
                sourceType:["album","camera"],
                success(res){
                    that.images = res.tempFilePaths
                }
            })
        }
    }
}
</script>

<style>
.content{
    height: 100%;
    width:100%;
}
textarea{
    width: 700rpx;
    padding: 25rpx 0;
}
.text-content{
    background-color: #f3efef;
    padding:0 25rpx;
}
.image-group{
    display: flex;
    white-space: nowrap;
    margin-top: 60rpx;
}
.image-group div{
    display: inline-block;
    flex-direction: row;
    width:375rpx;
    height: 375rpx;
    margin-right: 20rpx;
    margin-left: 20rpx;
    background-color: #cfcccc;
}
.image-group div img{
    width: 100%;
    height: 100%;
    align-items: center;
}
.image-group div icon{
    display: inline-block;
    position: absolute;
    vertical-align: top;
}
.btn-func{
    display: flex;
    flex-direction: column;
    width:100%;
    position: absolute;
    bottom:0;
    margin: 0 auto;
    align-items: center;
}

.btn-img{
    width:400rpx;
    height: 90rpx;
    line-height: 90rpx;
    margin-top: 40rpx;
    margin-bottom: 40rpx;
    background-color: green;
    color:#fff;
}
.btn{
    width: 400rpx;
    height: 90rpx;
    line-height: 90rpx;
    background-color: red;
    color: #fff;
    margin-bottom: 40rpx;
}
</style>