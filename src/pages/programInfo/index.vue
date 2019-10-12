<template>
  <div>
      <div class="container">
          <div class="title">{{programData.programName}}</div>
          <div class="time-info">{{programData.commonPlayTime}}</div>
      </div>
      <div class="description">
          {{programData.programDescription}}
      </div>
      <button @click="returnIndex">返回电视列表</button>
  </div>
</template>

<script>
export default {
    mounted(){
        this.programData = this.globalData.programDescripton
    },
    data(){
        return{
            programData : []
        }
    },
    methods:{
        returnIndex(){
            mpvue.navigateTo({
                url:"/pages/tvIndex/main"
            })   
        }
    }
}
</script>

<style>
.title{
    font-size:40rpx;
    font-weight: bold;
    margin-top:20rpx;
}
.time-info{
    font-size:30rpx;
    color:gray;
    margin: 20rpx 0;
}
.description{
    font-size:40rpx;
}
.button{
    width: 90%;
    margin: 40rpx 0;
}
</style>