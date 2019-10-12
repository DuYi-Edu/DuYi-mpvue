<template>
  <div class="books-item" :isbn="isbn" :index="index" @click="redirectToDetail" :data-isbn="isbn">
    <img class="imagecls" :src="image" alt="image" />
    <div class="books-item-txt">
      <div class="txt-title">
        <div>{{title}}</div>
      </div>
      <div class="txt-source">
        <div>{{subTitle}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props:["isbn","index","image","title","subTitle"],
    data(){
        return{

        }
    },
    methods:{
      //跳转详情页面
      redirectToDetail(e){
        let isbn = e.currentTarget.dataset.isbn
        if(isbn){
          mpvue.navigateTo({
            url:`/pages/book/main?isbn=${isbn}`
          })
        }else{
          wx.showToast({
            title:"参数错误"
          })
        }
        
      }
    }
};
</script>

<style>
.books-item {
  margin-bottom: 15px;
  overflow: hidden;
  zoom: 1;
  position: relative;
}
.books-item image {
  float: left;
  width: 80px;
  margin-right: 10px;
}
.books-item .books-item-txt {
  display: inline-block;
  float: left;
  width: 100%;
  padding-left: 90px;
  position: absolute;
  left: 0;
  box-sizing: border-box;
}

.imagecls {
  width: 80px;
  height: 104px;
  background: #eee;
}
.txt-title {
  font-size: 1.6em;
  line-height: 1.2em;
  word-break: break-all;
  hyphens: manual;
}
.txt-source {
  font-size: 1.2em;
  color: #aaa;
  margin-top: 5px;
}
</style>