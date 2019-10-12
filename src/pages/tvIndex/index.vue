<template>
  <div>
      <div class="container">
          <div class="title">我的电视</div>
          <div class="page-section">
              <block v-for="item in channelLists" :key="index">
                <mymenu :channelimg="item.channelImg" :channelname="item.channelName" :channelindex="index"/>
              </block>
          </div>
      </div>
      
  </div>
</template>

<script>
import mymenu from "@/components/menu"
const db = wx.cloud.database({
    env:"test-jj55w"
})
const channelListsObj = db.collection("channelList")
const _cmd = db.command

export default {
    onLoad(){
        //获取云端数据
        channelListsObj.get()
            .then(res=>{
                this.channelLists = res.data
            })
            .catch(console.error)
    },
    components:{
        mymenu
    },
    data(){
        return{
            channelLists:[]
        }
    },
    methods:{

    }
}
</script>

<style>
.title{
    font-size:40rpx;
    font-weight: bold;
}
.page-section{
    width:100%
}
</style>