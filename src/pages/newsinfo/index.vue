
<template>
  <div>
      <div class="art-header">
          <img class="art-img" :src="newsImg" alt="image">
          <div class="art-title">{{newsTitle}}</div>
          <div class="art-source">{{newsImgsource}}</div>
      </div>
      <div class="art-content">
          <rich-text :nodes="newsContent"></rich-text>
      </div> 
  </div> 
</template>

<script>
export default {
    onLoad(e){
        console.log("onLoad",e)
        this.$fly.request({
            method:'get',
            url:"http://news-at.zhihu.com/api/4/news/"+e.newsid,
            body:{}
        }).then(res=>{
            console.log(res)
            this.newsTitle = res.data.title
            this.newsImg = res.data.image
            this.newsImgsource = res.data.image_source
            this.newsContent = res.data.body
        }).catch(err=>{
            console.log(err)
        })
    },
    mounted(){
        
    },
    data(){
        return{
            newsTitle:'新闻标题',
            newsImg:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3762095652,4288929885&fm=26&gp=0.jpg',
            newsImgsource:'图片来源',
            newsContent:'新闻内容'
        }
    },
    methods:{

    }
}
</script>

<style>
.art-header{
    position: relative;
    width: 100%;
    height: 440rpx;
    color: #fff;
}

.art-img{
    width:100%;
    height: 440rpx;
}

.art-title{
    position:absolute;
    bottom: 60rpx;
    left:16rpx;
    font-size:32rpx;
}

.art-source{
    position: absolute;
    bottom:16rpx;
    font-size:28rpx;
    right:16rpx;
}

.art-content{
    padding-top: 32rpx;
    padding-bottom: 32rpx;
    font-size:28rpx;
    color:gray;
    width: 100%;
}
</style>