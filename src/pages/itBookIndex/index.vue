<template>
  <div>
      <div class="container page-index">
          <!-- search -->
          <div class="search-form">
              <input type="text" placeholder="输入要搜索的关键字" :value="query" @input="bindKeyInput">
              <icon type="search" size="20" @click="bindSearch"></icon>
          </div>
         <!-- 图书列表 -->
         <div class="books-list">
             <loading :hidden="hidden">加载中...</loading>
             <block v-for="item in books" :key="index">
                 <bookitem 
                    :isbn="item.isbn"
                    :index="index"
                    :image="item.Image"
                    :title="item.Title"
                    :subTitle="item.SubTitle"
                />
             </block>
         </div>
      </div>
  </div>
</template>

<script>
import bookitem from "@/components/bookitem"
export default {
    //生命周期函数
    mounted(){
        this.fetchBookData()
    },
    //微信上拉触底事件
    onReachBottom(){
        this.page++
        this.fetchBookData()
    },
    data(){
        return{
            query:'python',
            hidden:true,
            page:1,
            books:[]
        }
    },
    components:{
        bookitem
    },
    methods:{
        //搜索被点击
        bindSearch(){
            this.books=[]
            this.fetchBookData()
        },
        //修改输入框的内容
        bindKeyInput(e){
            this.query = e.target.value
        },
        fetchBookData(){
            //显示loading
            this.hidden = false;
            //request请求数据
            this.wxReqeust()
        },
        //微信的请求
        wxReqeust(){
            wx.request({
                url:this.ebooklist(this.query,this.page),
                success:(res)=>{
                   console.log(res)
                   if(res.data.Total != '0'){
                    this.books = this.books.concat(res.data.Books);
                    this.hidden = true
                   }else{
                       //无数据
                       this.books=[]
                       this.hidden = true
                       wx.showModal({
                           title:"操作提示",
                           content:"暂无检索数据",
                           showCancel:false
                       })
                   }
                }
            })
        },
        //组织url结构
        ebooklist(query,page){
            const EBOOK_HOST_URL = "http://it-ebooks-api.info/v1/"
            var url = page?(EBOOK_HOST_URL+"search/"+query+'/page/'+page):
            (EBOOK_HOST_URL+'search/'+query)
            return url
        }
    }
}
</script>

<style>
.page-index{
 padding-top:65px;
 background:#f5f5f5;
}
.search-form{
  padding:0 10px;
  position: fixed;
  top:10px;
  left:0;
  width: 100%;
  box-sizing:border-box;
  z-index: 999;
}
.search-form input{
  width: 84%;
  border:1px solid #dedede;
  height:40px;
  padding: 0 5px;
  background:#fff;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
  border-radius: 3px;
}
.search-form icon{
  display: inline-block;
  border:none;
  background:none;
  position:absolute;
  right:20px;
  top:10px;
}
.books-list{
  padding: 0 10px;
}
</style>