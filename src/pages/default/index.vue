<template>
  <div class="container">
    <div class="category">类别分类：{{articlemodel.data.categoryName}}</div>
    <span class="title">{{articlemodel.data.article.title}}</span>
    <span class="content">{{articlemodel.data.article.summary}}</span>
    <img :src="articlemodel.data.article.imgUrl" alt="image" class="img">
    <!-- 评论 -->
    <div class="pinglunTitle">评论</div>
    <div v-for="item in articlemodel.data.comments" :key="index">
      <div class="content btn">{{index+1}}.来自：{{item.cityText}} 网友</div>
      <div class="content">发表内容：{{item.content}}</div>
    </div>
    <!-- 更多新闻 -->
    <div class="title">更多新闻</div>
    <div v-for="item in articlemodel.data.relateds" :key="index">
      <a :href="'/pages/default/main?id='+item.id">
        <img :src="item.imgUrl" alt="image" class="img">
        <div class="content">标题：{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
    onLoad(opt){
      if(opt.id == ""){
        wx.showToast({
          title:"参数错误",
          icon:"none",
          duration:1000
        })

        mpvue.navigateTo({
          url:"/pages/index/main"
        })
      }
      this.matherClassNewsID =  opt.id
      //数据的获取
      this.getNewsbyID(this.matherClassNewsID)
    },
    data(){
        return{
          matherClassNewsID:0,
          articlemodel:{}
        }
    },
    methods:{
        //获取新闻详细信息，通过id
        getNewsbyID(newsID){
          console.log(newsID)
          let id = newsID
          let _url = "http://z.yeemiao.com/mm/api/article/get-article-detail"
          wx.request({
            url:_url,
            data:{
              id:id,
              isRelated:1,
              isComment:1
            },
            method:'POST',
            header:{
              'Content-Type':'application/json'
            },
            success:(res)=>{
              console.log(res)
              this.articlemodel = res.data
            },
            fail:(res)=>{
              console.error(res)
            }
          })
        }
    }
}
</script>

<style>
page{
  font-size:36rpx;
  color:#595959;
}
.category{
  color:red;
  margin:10rpx;
  font-size:26rpx;
}
.title{
  font-weight:bold;
  padding:10rpx;
}
.content{
  padding:20rpx;
  line-height:40rpx;
  font-size:28rpx;
  color:black;
}
.img{
  width: 100%;
  height: 250rpx;
}
.pinglunTitle{
  padding: 20rpx;
}
.btn{
  width: 90%;
  border-bottom: 2rpx dashed #595959
}
</style>