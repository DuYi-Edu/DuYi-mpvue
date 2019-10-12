<template>
 <div class="container">
   <div class="page-section">
     <button type="primary" @click="upload">上传图片</button>
   </div>
   <img :src="imgUrl" alt="image" :hidden="showImg">
   <button @click="showMyPhotos">查看我的图库</button>
 </div>

</template>

<script>
const db = wx.cloud.database()
const db_imglist = db.collection("imagelist")
export default {
  onShow(){
    //从后台（非激活状态）改变为前台（激活状态）
    this.imgUrl = "/static/images/user.png"
  },
  data () {
    return { 
      showImg:true,
      imgUrl:""
    }
  },
  components: {
  },
 
  methods: {
    getNowFormateData(){
      let date = new Date()
      let seperator1 = "-"
      let seperator2 = ":"
      let month = date.getMonth() +1
      let strDate = date.getDate()
      if(month >=1 && month <=9){
        month = "0" + month
      }
      if(strDate >=0 && strDate <=9){
        strDate = "0"+strDate
      }
      //拼接
      let currentdate = 
        date.getFullYear()+
        seperator1 +
        month +
        seperator1 +
        strDate + 
        " " +
        date.getHours()+
        seperator2 +
        date.getMinutes() +
        seperator2 +
        date.getSeconds();
      return currentdate
    },
    addImgList(imgUrl){
      let db_add_data={
        name:'JC',
        imgUrl:imgUrl,
        time:this.getNowFormateData()
      }
      console.log("db_add_data",db_add_data)
      //向服务器的发送数据
      db_imglist.add({
          data:db_add_data,
          success:res=>{
            console.log("res",res)
            wx.showToast({
              title:"上传成功",
              duration:1000
            })
            //1.跳转，2.不跳转(利用当前页面其他链接)
          }
      })      
    },
    //查看跳转
    showMyPhotos(){
      mpvue.navigateTo({
        url:"/pages/logs/main"
      })
    },
    upload(){
      let that = this
      //选择图片
      wx.chooseImage({
        count:2,//同时上传图片数量
        success:(res)=>{
          //用户等待操作
          wx.showLoading({
            title:"上传中..."
          })
          //多图片的处理foreach
          res.tempFilePaths.forEach((item,index)=>{
            //定义存储名称
            let imgName = Math.random(1000) * 100 + '.png'
            //云端使用
            wx.cloud.uploadFile({
              cloudPath:imgName,
              filePath:res.tempFilePaths[0],
              success:res=>{
                console.log("res",res)
                //隐藏Loading
                wx.hideLoading()
                //显示预览区
                that.imgUrl = res.fileID
                that.showImg = false
                //插入数据库
                console.log("sss")
                that.addImgList(res.fileID)
              }
            })
          })
        }
        
      })
    }
  },

  created () {
  
  }
}
</script>

<style scoped>
.page-section{
  width:90%;
  display:flex;
  flex-direction: column;
  background: #fff;
  border-radius:10rpx;
  padding:10rpx;
  margin:4%;
}
.page-section button{
  width:90%;
}
.page-section img{
  width: 100%;
}
</style>
