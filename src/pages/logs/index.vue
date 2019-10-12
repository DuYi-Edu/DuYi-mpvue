<template>
  <div class="container">
    <block v-for="item in dataList" :key="index">
      <span class="item-name">{{item.name}}</span>
      <span class="item-name">{{item.time}}</span>
      <img :src="item.imgUrl" class="photo" alt="image"/>
      <img src="/static/images/delete.png" alt="image" @click="deleteImg" :data-imgurl="item.imgUrl" :data-id="item._id" class="shanchu">
    </block>

  </div>
</template>

<script>
const db = wx.cloud.database()
const db_imgList = db.collection("imagelist")
export default {
 
  onShow(){
    this.getImageList()
  },
  components: {

  },

  data () {
    return {
      dataList:[]
    }
  },

  methods:{
    //删除图片
    deleteImg(e){
      let that = this
      let id = e.currentTarget.dataset.id
      let fileID = e.currentTarget.dataset.imgurl
      //询问
      wx.showModal({
        title:"警告",
        content:"确定要删除吗？",
        success(res){
          if(res.confirm){
            //确定要删除
            //云记录数据库记录删除
            db_imgList.doc(id).remove({
              success(res){
                //同步删除云存储文件
                that.deleteCloudFile(fileID)
              }
            })
          }
        }
      })
    },
    //删除云文件
    deleteCloudFile(fileID){
      try{
      //1，获取这条记录的所有内容，待catch使用
      //2.删除
      wx.cloud.deleteFile({
        fileList:[fileID],
        success(res){
          console.log("deleteCloudFile-success",res)
          //跳转回上传界面
          mpvue.redirectTo({
            url:"/pages/index/main"
          })
        },
        fail(res){
          console.log("deleteCloudFile-fail",res)
        }
      })
      }catch(res){
        //一旦trye的多数据操作失败后，需要在catch完成还原操作

      }
    },
    //获取图库数据列表
    getImageList(){
      let that = this
      //云数据下载
      db_imgList.get({
        success(res){
          that.dataList=res.data
          console.log(that.dataList)
        }
      })
    }
  },

  created () {
    
  }
}
</script>

<style>
.shanchu{
  width: 40rpx;
  height: 40rpx;
}
.photo{
  width: 180rpx;
  height: 180rpx;
}
</style>
