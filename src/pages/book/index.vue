<template>
  <div class="container">
    <loading :hidden="hidden">加载中...</loading>
    <div class="book-detail">
      <img
        :src="info.image"
        alt="image"
        class="book-image"
        style="width:300px;height:393px;display:block;margin:10px auto;background-color: #eeeeee;"
      />
      <div class="books-item-txt">
        <div class="txt-title">
          <span>{{info.title}}</span>
        </div>
        <div>
          <span style="color:#aaa;clear:both">Published in {{info.year}}</span>
        </div>
        <div class="txt-source">
          <span>{{info.subTitle}}</span>
        </div>
        <div class="books-item-author">
          <img
            src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-128.png"
            alt="image"
            class="avatar"
            style="width:20px;height:20px"
          />
          <div class="author-txt">
            <span style="margin-top:5px">{{info.author}}</span>
          </div>
        </div>
      </div>
      <!-- 下载连接 -->
      <a :href="info.url" class="book-download">
        <icon type="download" size="30" class="download-icon"></icon>
        <span>Download This Book</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  onLoad(e) {
    this.isbn = e.isbn;
    this.fetchBookData(this.isbn);
  },
  data() {
    return {
      isbn: "",
      info: {},
      hidden:true
    };
  },
  methods: {
    fetchBookData(isbn) {
      let that = this;
      this.hidden=false
      let url = this.ebookinfo(isbn);
      wx.request({
        url: url,
        success: res => {
          that.info = res.data
          that.hidden = true
        }
      });
    },
    ebookinfo(isbn) {
      const EBOOK_HOST_URL = "https://api.itbook.store/1.0/books/";
      return EBOOK_HOST_URL + isbn;
    }
  }
};
</script>

<style>
.book-detail{
  padding:10px;
}
.book-detail .books-item{
  overflow:auto;
}
.boos-item-author{
  margin-top:10px;
}
.avatar{
  clear:both;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 3px;
}
.book-detail .book-image{
  width:100%;
}
.txt-title{
  font-size:2.0em;
  line-height: 1.2em;
}
.txt-source{
  font-size:1.4em;
}
.author-txt{
  display:inline-block;
}
.download-icon{
  vertical-align: middle;
  margin-right: 10px;
  background: #fff;
  border-radius: 50%;
  border: none;
}
.book-download{
  margin-top: 20px;
  display: block;
  text-align: center;
  background: #2fb109;
  color: #fff;
  font-size:1.6em;
  border-radius: 3px;
  padding:8px 0;
}
</style>