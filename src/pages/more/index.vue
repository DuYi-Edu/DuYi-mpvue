<template>
  <div class="container">
      <scroll-view class="scroll-view" :scroll-y="scrollY">
          <block v-for="item in wishList" :key="index">
              <div :class="[checkedID == item.id?'item on':'item']" @click="check" :data-id="item.id">
                  <div class="state">
                      <div class="circle"></div>
                  </div>
                  <div class="sentence">{{item.content}}</div>
              </div>
          </block>
      </scroll-view>
      <!-- 确定按钮 -->
      <button class="save" hover-class="save-hover" @click="save">确定</button>
  </div>
</template>
 
<script>
import sentence from "@/utils/data"
export default {
    mounted(){
        this.wishList = sentence.sentence
    },
    data(){
        return{
            wishList:[],
            scrollY:true,
            checkedID:0
        }
    },
    methods:{
        //点击文本模板
        check(e){
            console.log(e.currentTarget.dataset.id)
            this.checkedID = e.currentTarget.dataset.id
        },
        save(){
            if(this.checkedID == 0){//没有选择
                wx.showToast({
                    title:'没有选择',
                    icon:"none",
                    duration:1000
                })
            }else{
                //已经选择
                //获取已经选择了的ID
                let getCheckedID = this.checkedID
                //获取模板列表
                let getWishList = this.wishList
                //循环wishtList
                getWishList.forEach((item,index)=>{
                    if(item.id == getCheckedID){
                        //给全局变量赋值
                        this.globalData.wishesInfo.sentence = item.content
                        console.log('this.globalData.wishesInfo',this.globalData.wishesInfo)
                        //微信跳转回退操作
                        wx.navigateBack()
                    }
                })
            }
        }
    }
}
</script>

<style>
.scroll-view{
    background-color:#fff;
    height:calc(100%-88rpx);
}
.scroll-view .item{
    box-sizing: border-box;
    margin-top:0;
    margin: 0 24rpx;
    border:none;
    background-color: transparent;
    font-size:28rpx;
    display: flex;
    align-items:center;
    padding:26rpx 6rpx;
}
.scroll-view .item + .item{
    border-top:2rpx solid #e0e0e0;
}
.scroll-view .item .state{
    margin-right:20rpx;
    width: 32rpx;
    height: 32rpx;
    border:4rpx solid #e7404d;
    border-radius: 100%;
    position: relative;
}
.scroll-view .item .state .circle{
    position: absolute;
    width:20rpx;
    height: 20rpx;
    background-color:#e7404d;
    top:0;
    left: 0;
    right:0;
    bottom:0;
    margin: auto;
    border-radius: 100%;
    display: none;
}
.scroll-view .item .sentence{
    overflow: hidden;
    width: 100%;
    height: 100%;
    flex:1;
}
.save{
    height:88rpx;
    width:100%;
    background-color:#fff;
    position: absolute;
    bottom:0;
    color:#e7404d;
    border-top:2rpx solid #d6d6d6;
    border-radius: 0;
}
.save::after{
    border:none;
    border-radius: 0;
}
.save-hover{
    background:rgba(242,242,242,0.7)
}

.scroll-view .item.on .state .circle{
    display:block
}

</style>