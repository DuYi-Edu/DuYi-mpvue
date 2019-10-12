<template>
 <div class="container">
   <button type="primary" @click="getChooseImg">选取图片</button>
   <img :src="tempFilePaths" alt="image">
   <button type="default" @click="storeToCloud">上传图片去云端</button>
   <div>云函数上传后的查看</div>
   <img :src="cloudPaths" alt="image">
   <div>下载图片</div>
   <button type="warn" @click="download">下载图片</button>
   <div>删除图片</div>
   <button type="default" @click="deleteFile" :data-fileID="fileID">删除图片</button>
   <button type="primary" @click="changeTempFileUrl">换取临时链接</button>
 </div>
</template>

<script>


export default {
  data () {
    return {
     tempFilePaths:"",
     cloudPaths:"",
     fileID:"cloud://test-jj55w.7465-test-jj55w-1259579153/1.439286561028874.png"
    }
  },
  methods: {
    //换取临时链接
    changeTempFileUrl(){
      wx.cloud.getTempFileURL({
        fileList:['cloud://test-jj55w.7465-test-jj55w-1259579153/1818_524.png'],
        success:res=>{
          console.log(res)
        },
        fail:console.error
      })
    },
    //删除图片
    deleteFile(e){
      console.log(e.target.dataset.fileid)
      
      wx.cloud.deleteFile({
        fileList:[e.target.dataset.fileid],
        success:res=>{
          console.log(res)
        }
      })
      
    },
    //下载图片
    download(){
      wx.cloud.downloadFile({
        fileID:'cloud://test-jj55w.7465-test-jj55w-1259579153/3387_553.png',
        success:res=>{
          console.log(res)
        },
        fail:console.error
      })
    },
    //上传文件
    storeToCloud(){
      let that = this
      let cloudName = Math.random(100)*100+".png"
      
      wx.cloud.uploadFile({
        cloudPath:cloudName,
        filePath:this.tempFilePaths,
        success:res=>{
          console.log(res)
          that.cloudPaths = res.fileID
        },
        fail:console.error
      })
      
    },
    //获取选择的图片
    getChooseImg(){
      let that = this
      //微信接口
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          that.tempFilePaths = res.tempFilePaths[0]
          console.log(that.tempFilePaths)
        }
      })
    }
  },

}
</script>

<style scoped>

</style>
